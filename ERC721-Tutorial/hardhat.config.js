require("@nomicfoundation/hardhat-toolbox");
const { ALCHEMY_API_KEY : API_KEY, GOERLI_PRIVATE_KEY : PRIVATE_KEY } = require('../secret.json');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${API_KEY}`,
      accounts: [PRIVATE_KEY],
    },
  },
};
