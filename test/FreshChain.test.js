const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FreshChain", function () {
  let freshChain;
  let owner;
  let producer;
  let transporter;
  let distributor;
  let retailer;
  let customer;

  beforeEach(async function () {
    [owner, producer, transporter, distributor, retailer, customer] = await ethers.getSigners();

    const FreshChain = await ethers.getContractFactory("FreshChain");
    freshChain = await FreshChain.deploy();
  });

  describe("Actor Registration", function () {
    it("Should register a producer", async function () {
      await freshChain.registerProducer(producer.address);
      expect(await freshChain.isProducer(producer.address)).to.be.true;
    });

    it("Should register a transporter", async function () {
      await freshChain.registerTransporter(transporter.address);
      expect(await freshChain.isTransporter(transporter.address)).to.be.true;
    });

    it("Should register a distributor", async function () {
      await freshChain.registerDistributor(distributor.address);
      expect(await freshChain.isDistributor(distributor.address)).to.be.true;
    });

    it("Should register a retailer", async function () {
      await freshChain.registerRetailer(retailer.address);
      expect(await freshChain.isRetailer(retailer.address)).to.be.true;
    });

    it("Should only allow owner to register actors", async function () {
      await expect(
        freshChain.connect(producer).registerProducer(producer.address)
      ).to.be.revertedWith("Only owner can call this function");
    });
  });

  describe("Batch Creation", function () {
    beforeEach(async function () {
      await freshChain.registerProducer(producer.address);
    });

    it("Should create a batch", async function () {
      await freshChain.connect(producer).createBatch(101, "Tomatoes", 100);
      
      const batch = await freshChain.getBatchInfo(101);
      expect(batch.productName).to.equal("Tomatoes");
      expect(batch.quantity).to.equal(100);
    });

    it("Should only allow registered producers to create batches", async function () {
      await expect(
        freshChain.connect(customer).createBatch(101, "Tomatoes", 100)
      ).to.be.revertedWith("Only registered producers can call this");
    });
  });

  describe("Sensor Data", function () {
    beforeEach(async function () {
      await freshChain.registerProducer(producer.address);
      await freshChain.registerTransporter(transporter.address);
      await freshChain.connect(producer).createBatch(101, "Tomatoes", 100);
    });

    it("Should add sensor data", async function () {
      await freshChain.connect(transporter).addSensorData(101, 4, 65, "Bursa");
      
      const readings = await freshChain.getSensorReadings(101);
      expect(readings.length).to.equal(1);
      expect(readings[0].temperature).to.equal(4);
      expect(readings[0].humidity).to.equal(65);
      expect(readings[0].location).to.equal("Bursa");
    });

    it("Should validate temperature range", async function () {
      await expect(
        freshChain.connect(transporter).addSensorData(101, 50, 65, "Bursa")
      ).to.be.revertedWith("Temperature must be between -10 and 40");
    });

    it("Should validate humidity range", async function () {
      await expect(
        freshChain.connect(transporter).addSensorData(101, 4, 150, "Bursa")
      ).to.be.revertedWith("Humidity must be between 0 and 100");
    });
  });

  describe("Ownership Transfer", function () {
    beforeEach(async function () {
      await freshChain.registerProducer(producer.address);
      await freshChain.registerTransporter(transporter.address);
      await freshChain.registerDistributor(distributor.address);
      await freshChain.connect(producer).createBatch(101, "Tomatoes", 100);
    });

    it("Should transfer ownership", async function () {
      await freshChain.connect(producer).transferOwnership(101, transporter.address);
      
      const batch = await freshChain.getBatchInfo(101);
      expect(batch.currentOwner).to.equal(transporter.address);
    });

    it("Should only allow current owner to transfer", async function () {
      await expect(
        freshChain.connect(transporter).transferOwnership(101, distributor.address)
      ).to.be.revertedWith("You are not the current owner of this batch");
    });

    it("Should track ownership history", async function () {
      await freshChain.connect(producer).transferOwnership(101, transporter.address);
      await freshChain.connect(transporter).transferOwnership(101, distributor.address);
      
      const history = await freshChain.getBatchHistory(101);
      expect(history[8].length).to.equal(3); // producer, transporter, distributor
    });
  });

  describe("Retailer Inspection", function () {
    beforeEach(async function () {
      await freshChain.registerProducer(producer.address);
      await freshChain.registerRetailer(retailer.address);
      await freshChain.connect(producer).createBatch(101, "Tomatoes", 100);
      await freshChain.connect(producer).transferOwnership(101, retailer.address);
    });

    it("Should mark batch as arrived", async function () {
      await freshChain.connect(retailer).markAsArrived(101, true);
      
      const batch = await freshChain.getBatchInfo(101);
      expect(batch.arrivedAtRetailer).to.be.true;
      expect(batch.passedInspection).to.be.true;
    });

    it("Should only allow retailer to mark as arrived", async function () {
      await expect(
        freshChain.connect(producer).markAsArrived(101, true)
      ).to.be.revertedWith("Only registered retailers can call this");
    });
  });
});
