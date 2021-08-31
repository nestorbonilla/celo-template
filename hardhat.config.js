require("@nomiclabs/hardhat-waffle");

const fs = require('fs');
const path = require('path');
const privateKeyFile = path.join(__dirname, './.secret');
const Account = require('./scripts/celo_account');
const CeloDeploy = require('./scripts/celo_deploy');

task("celo-account", "Prints account address or create a new", async () => {
  fs.existsSync(privateKeyFile) ? console.log(`Address ${Account.getAccount().address}`) : Account.setAccount();
});

task("celo-deploy", "Deploy smart contracts to the Celo blockchain", async () => {
  await CeloDeploy.ToAlfajore();
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
};
