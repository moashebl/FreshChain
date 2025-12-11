const hre = require("hardhat");

async function main() {
  console.log("Deploying FreshChain contract...");

  // Get the contract factory
  const FreshChain = await hre.ethers.getContractFactory("FreshChain");
  
  // Deploy the contract
  const freshChain = await FreshChain.deploy();
  
  await freshChain.waitForDeployment();
  
  const address = await freshChain.getAddress();
  
  console.log(`FreshChain deployed to: ${address}`);
  console.log(`Deployer (Owner): ${await freshChain.owner()}`);
  
  // Wait for a few block confirmations
  console.log("Waiting for block confirmations...");
  await freshChain.deploymentTransaction().wait(5);
  
  console.log("\nDeployment completed!");
  console.log("\nNext steps:");
  console.log("1. Save the contract address:", address);
  console.log("2. Update frontend/src/config.js with the contract address");
  console.log("3. Verify the contract on Etherscan (optional):");
  console.log(`   npx hardhat verify --network sepolia ${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
