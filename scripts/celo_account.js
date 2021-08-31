const Web3 = require('web3');
const fs = require('fs');
const path = require('path');
const web3 = new Web3();
const privateKeyFile = path.join(__dirname.replace("/scripts", ""), './.secret');

//Function getAccount will return the address of your account
const getAccount = () => {
    const secret = fs.readFileSync(privateKeyFile);
    const account = web3.eth.accounts.privateKeyToAccount(secret.toString())
    return account;
};

//Function setAccount will crate new account and save the privateKey in .secret file 
const setAccount = () => {
    const newAccount = web3.eth.accounts.create();
    fs.writeFileSync(privateKeyFile, newAccount.privateKey, (err) => {
        if (err) {
            console.log(err);
        }
    });
    console.log(`* address created: ${newAccount.address}`);
};

module.exports = {
    getAccount,
    setAccount
}