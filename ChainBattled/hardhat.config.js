require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

const Alchemy_Url = process.env.ALCHEMY_API_URL;
const Private_Key = process.env.PRIVATE_KEY;
const Api_Key = process.env.API_KEY;
const Polygon_API = process.env.POLYGONSCANAPI_KEY;


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: Alchemy_Url,
      accounts: [Private_Key],
    },
  },
  etherscan: {
    apiKey: Polygon_API,
  },
};
