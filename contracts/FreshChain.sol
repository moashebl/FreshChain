// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title FreshChain
 * @dev Blockchain-based food traceability and quality verification system
 * @notice This contract manages the supply chain from farmer to customer
 */
contract FreshChain {
    
    // =========================
    // State Variables
    // =========================
    
    address public owner;
    
    // Actor mappings
    mapping(address => bool) public isProducer;
    mapping(address => bool) public isTransporter;
    mapping(address => bool) public isDistributor;
    mapping(address => bool) public isRetailer;
    
    // =========================
    // Structs
    // =========================
    
    struct SensorData {
        int temperature;
        int humidity;
        string location;
        uint timestamp;
        address recordedBy;
    }
    
    struct Batch {
        uint batchId;
        string productName;
        uint quantity;
        address currentOwner;
        address producer;
        uint createdAt;
        bool exists;
        bool arrivedAtRetailer;
        bool passedInspection;
        SensorData[] sensorReadings;
        address[] ownershipHistory;
    }
    
    // Mapping from batchId to Batch
    mapping(uint => Batch) public batches;
    
    // =========================
    // Events
    // =========================
    
    event ProducerRegistered(address indexed producer);
    event TransporterRegistered(address indexed transporter);
    event DistributorRegistered(address indexed distributor);
    event RetailerRegistered(address indexed retailer);
    
    event BatchCreated(
        uint indexed batchId,
        string productName,
        uint quantity,
        address indexed producer,
        uint timestamp
    );
    
    event SensorDataAdded(
        uint indexed batchId,
        int temperature,
        int humidity,
        string location,
        address indexed transporter,
        uint timestamp
    );
    
    event OwnershipTransferred(
        uint indexed batchId,
        address indexed from,
        address indexed to,
        uint timestamp
    );
    
    event BatchArrived(
        uint indexed batchId,
        address indexed retailer,
        bool passedInspection,
        uint timestamp
    );
    
    // =========================
    // Modifiers
    // =========================
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyProducer() {
        require(isProducer[msg.sender], "Only registered producers can call this");
        _;
    }
    
    modifier onlyTransporter() {
        require(isTransporter[msg.sender], "Only registered transporters can call this");
        _;
    }
    
    modifier onlyDistributor() {
        require(isDistributor[msg.sender], "Only registered distributors can call this");
        _;
    }
    
    modifier onlyRetailer() {
        require(isRetailer[msg.sender], "Only registered retailers can call this");
        _;
    }
    
    modifier batchExists(uint batchId) {
        require(batches[batchId].exists, "Batch does not exist");
        _;
    }
    
    modifier isCurrentOwner(uint batchId) {
        require(
            batches[batchId].currentOwner == msg.sender,
            "You are not the current owner of this batch"
        );
        _;
    }
    
    // =========================
    // Constructor
    // =========================
    
    constructor() {
        owner = msg.sender;
    }
    
    // =========================
    // Admin Functions - Actor Registration
    // =========================
    
    /**
     * @dev Register a producer (farmer)
     * @param producer Address of the producer to register
     */
    function registerProducer(address producer) external onlyOwner {
        require(producer != address(0), "Invalid address");
        require(!isProducer[producer], "Producer already registered");
        
        isProducer[producer] = true;
        emit ProducerRegistered(producer);
    }
    
    /**
     * @dev Register a transporter
     * @param transporter Address of the transporter to register
     */
    function registerTransporter(address transporter) external onlyOwner {
        require(transporter != address(0), "Invalid address");
        require(!isTransporter[transporter], "Transporter already registered");
        
        isTransporter[transporter] = true;
        emit TransporterRegistered(transporter);
    }
    
    /**
     * @dev Register a distributor
     * @param distributor Address of the distributor to register
     */
    function registerDistributor(address distributor) external onlyOwner {
        require(distributor != address(0), "Invalid address");
        require(!isDistributor[distributor], "Distributor already registered");
        
        isDistributor[distributor] = true;
        emit DistributorRegistered(distributor);
    }
    
    /**
     * @dev Register a retailer
     * @param retailer Address of the retailer to register
     */
    function registerRetailer(address retailer) external onlyOwner {
        require(retailer != address(0), "Invalid address");
        require(!isRetailer[retailer], "Retailer already registered");
        
        isRetailer[retailer] = true;
        emit RetailerRegistered(retailer);
    }
    
    // =========================
    // Producer Functions
    // =========================
    
    /**
     * @dev Create a new batch of products
     * @param batchId Unique identifier for the batch
     * @param productName Name of the product (e.g., "Tomatoes")
     * @param quantity Quantity in kg or units
     */
    function createBatch(
        uint batchId,
        string memory productName,
        uint quantity
    ) external onlyProducer {
        require(!batches[batchId].exists, "Batch ID already exists");
        require(bytes(productName).length > 0, "Product name cannot be empty");
        require(quantity > 0, "Quantity must be greater than 0");
        
        Batch storage newBatch = batches[batchId];
        newBatch.batchId = batchId;
        newBatch.productName = productName;
        newBatch.quantity = quantity;
        newBatch.currentOwner = msg.sender;
        newBatch.producer = msg.sender;
        newBatch.createdAt = block.timestamp;
        newBatch.exists = true;
        newBatch.arrivedAtRetailer = false;
        newBatch.passedInspection = false;
        newBatch.ownershipHistory.push(msg.sender);
        
        emit BatchCreated(batchId, productName, quantity, msg.sender, block.timestamp);
    }
    
    // =========================
    // Transporter Functions
    // =========================
    
    /**
     * @dev Add sensor data (temperature, humidity, location)
     * @param batchId The batch to add sensor data to
     * @param temperature Temperature in Celsius (must be between -10 and 40)
     * @param humidity Humidity percentage (must be between 0 and 100)
     * @param location Current location of the batch
     */
    function addSensorData(
        uint batchId,
        int temperature,
        int humidity,
        string memory location
    ) external onlyTransporter batchExists(batchId) {
        require(temperature >= -10 && temperature <= 40, "Temperature must be between -10 and 40");
        require(humidity >= 0 && humidity <= 100, "Humidity must be between 0 and 100");
        require(bytes(location).length > 0, "Location cannot be empty");
        
        SensorData memory newReading = SensorData({
            temperature: temperature,
            humidity: humidity,
            location: location,
            timestamp: block.timestamp,
            recordedBy: msg.sender
        });
        
        batches[batchId].sensorReadings.push(newReading);
        
        emit SensorDataAdded(
            batchId,
            temperature,
            humidity,
            location,
            msg.sender,
            block.timestamp
        );
    }
    
    // =========================
    // Ownership Transfer Functions
    // =========================
    
    /**
     * @dev Transfer ownership of a batch to another actor
     * @param batchId The batch to transfer
     * @param newOwner Address of the new owner
     */
    function transferOwnership(
        uint batchId,
        address newOwner
    ) external batchExists(batchId) isCurrentOwner(batchId) {
        require(newOwner != address(0), "Invalid new owner address");
        require(
            isProducer[newOwner] || 
            isTransporter[newOwner] || 
            isDistributor[newOwner] || 
            isRetailer[newOwner],
            "New owner must be a registered actor"
        );
        require(!batches[batchId].arrivedAtRetailer, "Batch already arrived at retailer");
        
        address previousOwner = batches[batchId].currentOwner;
        batches[batchId].currentOwner = newOwner;
        batches[batchId].ownershipHistory.push(newOwner);
        
        emit OwnershipTransferred(batchId, previousOwner, newOwner, block.timestamp);
    }
    
    // =========================
    // Retailer Functions
    // =========================
    
    /**
     * @dev Mark batch as arrived at retailer with inspection result
     * @param batchId The batch that arrived
     * @param passedInspection Whether the batch passed quality inspection
     */
    function markAsArrived(
        uint batchId,
        bool passedInspection
    ) external onlyRetailer batchExists(batchId) isCurrentOwner(batchId) {
        require(!batches[batchId].arrivedAtRetailer, "Batch already marked as arrived");
        
        batches[batchId].arrivedAtRetailer = true;
        batches[batchId].passedInspection = passedInspection;
        
        emit BatchArrived(batchId, msg.sender, passedInspection, block.timestamp);
    }
    
    // =========================
    // Customer View Functions
    // =========================
    
    /**
     * @dev Get complete history of a batch
     * @param batchId The batch to query
     * @return batchId Batch ID
     * @return productName Product name
     * @return quantity Quantity
     * @return producer Producer address
     * @return currentOwner Current owner address
     * @return createdAt Creation timestamp
     * @return arrivedAtRetailer Whether arrived at retailer
     * @return passedInspection Whether passed inspection
     * @return ownershipHistory Array of all owners
     */
    function getBatchHistory(uint batchId)
        public
        view
        batchExists(batchId)
        returns (
            uint,
            string memory,
            uint,
            address,
            address,
            uint,
            bool,
            bool,
            address[] memory
        )
    {
        Batch storage batch = batches[batchId];
        
        return (
            batch.batchId,
            batch.productName,
            batch.quantity,
            batch.producer,
            batch.currentOwner,
            batch.createdAt,
            batch.arrivedAtRetailer,
            batch.passedInspection,
            batch.ownershipHistory
        );
    }
    
    /**
     * @dev Get sensor readings for a batch
     * @param batchId The batch to query
     * @return Array of sensor data readings
     */
    function getSensorReadings(uint batchId)
        public
        view
        batchExists(batchId)
        returns (SensorData[] memory)
    {
        return batches[batchId].sensorReadings;
    }
    
    /**
     * @dev Get basic batch information
     * @param batchId The batch to query
     * @return Batch struct information
     */
    function getBatchInfo(uint batchId)
        public
        view
        batchExists(batchId)
        returns (
            string memory productName,
            uint quantity,
            address currentOwner,
            bool arrivedAtRetailer,
            bool passedInspection
        )
    {
        Batch storage batch = batches[batchId];
        return (
            batch.productName,
            batch.quantity,
            batch.currentOwner,
            batch.arrivedAtRetailer,
            batch.passedInspection
        );
    }
    
    /**
     * @dev Check if an address is registered in any role
     * @param actor Address to check
     * @return role String describing the role
     */
    function getActorRole(address actor) public view returns (string memory role) {
        if (actor == owner) return "Owner";
        if (isProducer[actor]) return "Producer";
        if (isTransporter[actor]) return "Transporter";
        if (isDistributor[actor]) return "Distributor";
        if (isRetailer[actor]) return "Retailer";
        return "Unregistered";
    }
}
