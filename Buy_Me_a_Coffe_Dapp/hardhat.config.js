require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

const API_URL = process.env.ALCHEMY_API_URL;
const Api_Key = process.env.API_KEY
const Private_Key = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: API_URL,
      accounts: [Private_Key],
    },
  },
  etherscan: {
    apiKey: {
      goerli: Api_Key,
    },
  },
};
