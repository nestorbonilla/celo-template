# Celo Template

A Celo repo template that uses hardhat, expo and react-native, integrated with a set of deployment automation scripts.

## Requirements

- familiarity with Javascript, Typescript, NodeJS and React Native.
- have `yarn` installed.

## Get started

1. Run `yarn install` in the project root.
2. Run `yarn account`. This will print the public address of the Celo account private key saved in .secret, otherwise, it will create one and print its public address. Copy the private key for your new account into the `PRIVATE_KEY` variable in `.env`.
3. Fund the account address on the Alfajores testnet here: https://celo.org/developers/faucet
4. Deploy the test smart contract by running `yarn deploy`. This will deploy the smart contracts located in the contracts folder to the Alfajores network, and it will save the name, address, and path in `.env`.
