---
id: guide-launch-custom-blockchain
title: Launch a custom blockchain
sidebar_label: Launch a custom blockchain
slug: /launch-custom-blockchain
---

## Overview

A Capitalisk node is built on top of an engine called [LDEM](https://github.com/Capitalisk/ldem) - It allows a single node to efficiently participate in multiple blockchains.

With LDEM, it's possible to launch a new/custom blockchain using an existing [Lisk custom module](https://github.com/LiskHQ/lips/blob/master/proposals/lip-0005.md) as the source.

For example, the Capitalisk blockchain itself is based on a white-label module called [ldpos-chain](https://github.com/Capitalisk/ldpos-chain).
The [Leasehold](https://www.leasehold.io/) blockchain, on the other hand, is based on a different white-label module called [leasehold-chain](https://github.com/Leasehold/leasehold-chain) - The `leasehold-chain` module is a fork of the `lisk-chain` module from Lisk SDK v3 which is compatible with all the clients, wallets and tools from Lisk SDK v3.

Both of these chain modules are designed to work with [lisk-dex](https://github.com/Capitalisk/lisk-dex) - This means that any custom blockchain which is based on either of these two modules can be listed for trading on https://ldex.trading/ and also on any other compatible `lisk-dex` federation.

This guide will be focusing on how to launch a new custom blockchain based on the `ldpos-chain` module since it is the newest module and also the module which the Capitalisk blockchain itself is based on.

## 1. Requirements

### 1.1 A compatible LDEM node

To create a custom blockchain, you need to have an [LDEM](https://github.com/Capitalisk/ldem) node - Any node which is based on the LDEM engine is fine; this includes a [Leasehold](https://www.leasehold.io/) node or a Capitalisk node. But for the purpose of this guide, it is recommended to use a Capitalisk node - You should follow the guide [Setting up a new Capitalisk node](http://localhost:3000/docs/) to setup a node.

Once you have a working Capitalisk node, launching a new custom blockchain should only take a few minutes and doesn't require any additional installation steps.

### 1.2 LDPoS Commander CLI

You need to install the `ldpos-commander` Node.js module using the following command:

```shell script
npm install -g ldpos-commander
```

OR (if the above fails):

```shell script
sudo npm install -g ldpos-commander
```

Check that the installation was successful using the command:

```shell script
ldpos -v
```

If the command outputs a version number, it means that the installation was successful.

## 2. Create a new genesis.json file

Each blockchain needs to start from a genesis state. Blockchains based on `ldpos-chain` load their initial state from a file called `genesis.json` - It contains a list of accounts and balances which are present from the beginning of the blockchain as well as initial votes which determine who the initial forging delegates are.

For your custom blockchain, you will need to create your own `genesis.json` file - You can add as many genesis accounts to it as you want with whatever balance amounts and votes you want.

Your `genesis.json` file should follow the same structure as the `genesis.json` file of the Capitalisk blockchain: https://gist.github.com/jondubois/6061f01168f793308621b77b16ee64c1

- Copy the `genesis.json` file from the link above to your own computer.
- Change the `networkSymbol` to the symbol for your new blockchain (as you want it to appear on the DEX).
- Delete all the entries inside the `accounts` array; you will need to generate and add your own entries.

The simplest way to generate accounts is using `ldpos-commander` using this command:

```shell script
ldpos account generate
```

The output should look like this:

```
GENERATED WALLET AND PUBLIC KEYS:
{
  "passphrase": "walnut owner caught pass adapt surprise hero into noodle kid hour trend",
  "address": "clskf55132c7adccc5b1f97338e3b9a7df3ac2c7c0f2",
  "sigPublicKey": "f55132c7adccc5b1f97338e3b9a7df3ac2c7c0f28bb0732400b200a811178bca",
  "multisigPublicKey": "4bcb84f390475666b8f5ba61cea2315ffb1cb19a148fce9fb078eb960f314afd",
  "forgingPublicKey": "3306f6cd2ad590975b5f22f10948a766032367544eede9adb0d9775a71a9c68a"
}
```

You should run this command multiple times (e.g. 10 times); each time, you should save the details in a safe place; it's important not to lose the passphrases of the genesis accounts as you will need them to run and secure the network in the beginning.

Once you have generated all your genesis accounts, you should add their public details to the `genesis.json` file inside the `acccounts` array.

The format for each account object looks like this:

```json
{
  "address": "clsk71bcc5cd9c8cf5dc2c79d235ed5f2393b5ad56cb",
  "type": "sig",
  "forgingPublicKey": "218a928a7c8c21f7820d3bb198e41d5175886891334f4cb900062a5acb880458",
  "nextForgingKeyIndex": 0,
  "multisigPublicKey": "4826718943ce648ce1999549179f85df45a2477c6a51f07c656c6dc18b6a9ddf",
  "nextMultisigKeyIndex": 0,
  "sigPublicKey": "71bcc5cd9c8cf5dc2c79d235ed5f2393b5ad56cb9b3f4b0102e7e32c804c0a5a",
  "nextSigKeyIndex": 0,
  "balance": "10000000000000000",
  "votes": []
}
```

For each genesis account, you should substitute the `forgingPublicKey`, `multisigPublicKey` and `sigPublicKey` with the values from each account which you generated using the `ldpos account generate` command. Make sure that each account entry is separated by a single comma and that there are no trailing commas (must be valid JSON).
You can change the `balance` of each account to match your requirements; the smallest unit is `100000000` so you need to ignore the last 8 zeroes in order to get the value in standard units - The example account above has a balance of `10 million` tokens in standard units.

There is no minimum or maximum number of accounts which can be included in the `genesis.json` file but it's strongly recommended that you specify a sufficient number of accounts to serve as genesis forging delegates in the beginning. The default `forgerCount` for `ldpos-chain` is 15; in this case, it's recommended that you specify at least 10 accounts (~66% of available forging slots) to serve as genesis delegates - It's important that the majority of available delegate slots are controlled by a trusted party (e.g. yourself) in the beginning or else you run the risk of bad actors taking up the majority of slots by voting for themselves into a top spot using a very small amount of tokens.

Once you've defined all the genesis accounts and their starting balances, you will need to specify the genesis votes.
The simplest approach is to make one of the accounts hold most (or all) of the total supply (specified in the `balance` property) and make that account vote for itself as well as the other genesis accounts. To add votes, you just add a list of delegate addresses to the `votes` array of the relevant genesis voter account.

For example:

```
"votes": ["clsk71bcc5cd9c8cf5dc2c79d235ed5f2393b5ad56cb", "clskb32a9b7182ead076b6dafc7b59f903edf9ba1b19", "clska2495cacc5b2b3d08a548e05f061827021581af3"]
```

It's recommended that the genesis voter account vote for all 10 delegate accounts in order to take up the majority of available forging slots.
In the case of Capitalisk, the voting of other delegates was done some time after genesis; this is possible but not recommended as it requires coordination between participants.

## 3. Create a new database



## 4. Add a new custom module config object



## 5. Start your node

## 6. Get other nodes to join your new blockchain
