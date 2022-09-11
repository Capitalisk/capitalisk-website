---
id: developer-ldpos-client-js
title: LDPoS SDK Client JS
sidebar_label: LDPoS SDK Client JS
slug: /ldpos-client-js
---

## Get started

The `ldpos-client-js` package is the SDK used to interact with any `ldpos` blockchain. It exposes easy and understandable methods.

## Overview

This is an in depth guide on how to use `ldpos-client-js`. In this tutorial you will learn how to:

1. Setup a project
2. Create and connect a wallet
3. Create, sign and send a transaction

## Prerequisites

- [`npm` and `node.js`](https://nodejs.org/en/)
- [`ldpos-commander`](https://www.npmjs.com/package/ldpos-commander)

## 1. Setup your project

1. Create a project directory:

```
mkdir my-clsk-project
```

2. Enter the directory:

```
cd my-clsk-project
```

3. Initialize `npm` and install the [`ldpos-client-js`](https://www.npmjs.com/package/ldpos-client) package:

```
npm init -y
npm install ldpos-client
touch index.js
```

## 2. Create a testnet wallet and make a transaction

1. Open the `index.js` file:

:::danger

To receive testnet wallet tokens join our [Discord](https://discord.com/invite/Nrf33ck3Qq) and type `!faucet <address>` in the #faucet channel. You will receive 100 CLSK tokens. Note that this feature is limited to a one time use per 7 days. If you need any additional tokens please reach out to an admin.

:::

```js title="index.js"
const ldposClient = require('ldpos-client');
const bip39 = require('bip39');

// For a custom chain
const config = {
  hostname: '34.227.22.98', // IP or hostname to the node, it can be any node in the network
  port: 7001, // 7001 is the default convention the testnet, 8001 for the mainnet
  chainModuleName: 'capitalisk_chain', // module name of the chain
  networkSymbol: 'clsk',
};

// const config = {
//   hostname: 'testnet.clsk.dev',
//   port: '443',
//   networkSymbol: 'clsk',
//   chainModuleName: 'capitalisk_chain',
//   secure: true,
//   pollInterval: 10000,
// };

client = ldposClient.createClient(config);

(async () => {
  try {
    const passphrase = bip39.generateMnemonic();
    console.log('Generated passphrase:', passphrase);

    await client.connect({ passphrase });
    console.log('connection successful!');

    const wallet = await client.getWalletAddress();
    console.log('Wallet is:', wallet);

    const minFees = await client.getMinFees();
    console.log('Minimum fees are', minFees.minTransactionFees.transfer);

    // Prepare the transaction
    const tx = await client.prepareTransaction({
      type: 'transfer',
      recipientAddress: 'clsk65d4b765f0abe4dae5c564b4a6d2d7b70311fd9e',
      amount: '1000000000', // amounts to 1 CLSK
      fee: minFees.minTransactionFees.transfer,
      timestamp: Date.now(),
      message: 'Your first succesful transaction!',
    });

    // Post the transaction to the blockchain
    await client.postTransaction(tx);

    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
```
