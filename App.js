import 'node-libs-react-native/globals';
import React, { useState } from 'react';
import './global';
import { web3 } from './root';
import { StyleSheet, Text, View, StatusBar, LogBox } from 'react-native';
import {CONTRACT_1_PATH, CONTRACT_1_ADDRESS} from '@env';

LogBox.ignoreLogs([
  "Warning: The provided value 'moz",
  "Warning: The provided value 'ms-stream",
]);

export default function App() {

  // smart contract no. 1
  const contract1 = require(CONTRACT_1_PATH);
  const [name, setName] = useState("");
    
  async function getName() {

    // Create a new contract instance with the contract no. 1 info
    const instance = new web3.eth.Contract(
      contract1.abi,
      CONTRACT_1_ADDRESS
    );
    let nameFromContract = await instance.methods.getName().call();
    setName(nameFromContract);

  }

  getName();

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your Celo App!</Text>
      <Text>{name}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});