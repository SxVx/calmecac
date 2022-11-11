require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-waffle");
require("dotenv").config()

const BNB_RPC_URL =
  process.env.BNB_RPC_URL

const PRIVATE_KEY = 
  process.env.PRIVATE_KEY

module.exports = {
  solidity: "0.8.16",
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
    chainId: 1337 // We set 1337 to make interacting with MetaMask simpler
    },
    BNB: {
    url: BNB_RPC_URL,
    accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
  },
};