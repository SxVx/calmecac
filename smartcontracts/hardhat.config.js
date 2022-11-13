require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-waffle");
require("dotenv").config()

const FUJI_RPC_URL =
  process.env.FUJI_RPC_URL

const PRIVATE_KEY = 
  process.env.PRIVATE_KEY

const ACCOUNT_TWO = 
  process.env.ACCOUNT_TWO

const ACCOUNT_ORGANIZATION = 
  process.env.ACCOUNT_ORGANIZATION

module.exports = {
  solidity: "0.8.16",
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
    chainId: 1337 // We set 1337 to make interacting with MetaMask simpler
    },
    fuji: {
    url: FUJI_RPC_URL,
    accounts: [PRIVATE_KEY, ACCOUNT_TWO, ACCOUNT_ORGANIZATION],
    },
  },
};