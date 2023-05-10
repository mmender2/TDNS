/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config();
require('@nomiclabs/hardhat-waffle')
/* module.exports = {
  solidity: "0.8.17",
  paths: {
    artifacts: './src/artifacts'
  },
  networks: {
    hardhat: {
        accounts: [{privateKey: '6f31c3f8d975875a37c06f622b255dcf509dd229fa81bbbffb83377eff26a3f2',
        balance: '100000000000000000000',
        chainId: 31337
        }
       ]
    }
  }
}; */


module.exports={
  solidity: "0.8.17",
  paths: {
    artifacts: './src/artifacts'
  },
  networks: {
    hardhat: {
      chainID: 1337
    },
    mumbai: {
      url: process.env.url,
      accounts: [process.env.key]
    }
  }

}
