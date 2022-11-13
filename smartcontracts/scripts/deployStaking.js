require("dotenv").config()

async function main() {
  const [deployer] = await ethers.getSigners();

  const toWei = (num) => ethers.utils.parseEther(num.toString())

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const feePercent = 25
  const stakingPercent = 1000
  const minWithdrawal = 0.01
  const minDistribution = 0.3

  // Get the ContractFactories and Signers here.

  const NFT = await ethers.getContractFactory("NFT");
  const Marketplace = await ethers.getContractFactory("Marketplace");
  const Staking = await ethers.getContractFactory("StakingCumulative");
  
  [PRIVATE_KEY_ADMIN, ACCOUNT_TWO, ACCOUNT_ORGANIZATION] = await ethers.getSigners();

  console.log("Organization account:", ACCOUNT_ORGANIZATION.address);

  const nft = await NFT.deploy();
  const staking = await Staking.deploy(stakingPercent, ACCOUNT_ORGANIZATION.address, toWei(minWithdrawal), toWei(minDistribution));
  const marketplace = await Marketplace.deploy( feePercent, staking.address );
  const WITHDRAW_ROLE = await staking.connect(deployer).WITHDRAW_ROLE();
  const INCREASE_ROLE = await staking.connect(deployer).INCREASE_ROLE();
  await staking.grantRole( WITHDRAW_ROLE, deployer.address );
  await staking.grantRole( INCREASE_ROLE, marketplace.address );
  await staking.setMarketplace( marketplace.address );

  console.log("NFT address:", nft.address);
  console.log("Marketplace address:", marketplace.address);
  console.log("Staking address:", staking.address);

  // Save copies of each contracts abi and address to the frontend.
  saveFrontendFiles(marketplace , "Marketplace");
  saveFrontendFiles(nft , "NFT");
  saveFrontendFiles(staking , "Staking");
}

function saveFrontendFiles(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../../smartcontracts/contractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });