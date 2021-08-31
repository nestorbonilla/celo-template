const Web3 = require('web3');
const ContractKit = require('@celo/contractkit');
const fs = require('fs');
const envfile = require('envfile');
require('dotenv').config();

let previousEnvData = "";
fs.readFile('./.env', 'utf8', function (err,data) {
    if (err) {
        console.log('error in reading .env file, please verify the file exist.');
        return console.log(err);
    }
    previousEnvData = data;
});

const web3 = new Web3(process.env.RPC_API_URL);
const rootPath = __dirname.replace("/scripts", "");
const kit = ContractKit.newKitFromWeb3(web3);
const account = require('./celo_account');

async function ToAlfajore() {
    let envJson = envfile.parse(previousEnvData);
    let contracts = [];
    fs.readdirSync(rootPath + "/artifacts/contracts/").map(x => {
        fs.readdirSync(rootPath + "/artifacts/contracts/" + x).map(y => {
            if (!y.includes(".dbg.json")) {
                contracts.push("/artifacts/contracts/" + x + "/" + y);
            }
        });
    });

    const celoAccount = account.getAccount();
    kit.connection.addAccount(celoAccount.privateKey);
    console.log(`\n account deploying: ${celoAccount.address}`);

    await Promise.all(contracts.map(async (contract, i) => {
        try {
            const data = require(rootPath + contract);
            let tx = await kit.connection.sendTransaction({
                from: celoAccount.address,
                data: data.bytecode
            });
            let txResult = await tx.waitReceipt();
        
            envJson[`CONTRACT_${i+1}_NAME`] = data.contractName;
            envJson[`CONTRACT_${i+1}_ADDRESS`] = txResult.contractAddress;
            envJson[`CONTRACT_${i+1}_PATH`] = contract;
            
            console.log("\n + contract no. 1 (saved in .env):");
            console.log(`- name: ${data.contractName}`);
            console.log(`- address: ${txResult.contractAddress}`);
            console.log(`- local abi path: ${contract}`);
            console.log(`- gas used: ${txResult.gasUsed}`);
        } catch (error) {
            console.log(`error deploying contract no. ${i+1}: ${error}`);
        }   
    }));

    fs.writeFileSync('./.env', envfile.stringify(envJson));
    
    return;
}
module.exports = {
    ToAlfajore
}