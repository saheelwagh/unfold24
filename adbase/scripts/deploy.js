const { ethers } = require("hardhat");

async function main() {
  console.log("Fetching contract factory...");
  const MediaOptions = await ethers.getContractFactory("MediaOptions");

  console.log("Deploying contract...");
  const mediaOptions = await MediaOptions.deploy();

  console.log("Raw contract instance:", mediaOptions);

  console.log("Waiting for deployment to complete...");
  const deployed = await mediaOptions.deployed();

  console.log("Deployed contract address:", deployed.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment error:", error);
    process.exit(1);
  });
