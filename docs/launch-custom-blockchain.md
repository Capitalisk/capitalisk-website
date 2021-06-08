---
id: guide-launch-custom-blockchain
title: Launch a custom blockchain
sidebar_label: Launch a custom blockchain
slug: /launch-custom-blockchain
---

## Overview

This guide will show you how to setup the first node of your new custom blockchain and then show you how to get additional nodes to join it.

A Capitalisk node runs on an decentralized engine called [LDEM](https://github.com/Capitalisk/ldem) - It allows a single node to efficiently participate in multiple blockchains.
With LDEM, it's possible to launch a new/custom blockchain using an existing [Lisk custom module](https://github.com/LiskHQ/lips/blob/master/proposals/lip-0005.md) as the source (no coding necessary).

For example, the Capitalisk blockchain itself is based on a white-label module called [ldpos-chain](https://github.com/Capitalisk/ldpos-chain).
The [Leasehold](https://www.leasehold.io/) blockchain, on the other hand, is based on a different white-label module called [leasehold-chain](https://github.com/Leasehold/leasehold-chain) - The `leasehold-chain` module is a fork of `lisk-chain` so it is compatible with all the clients, wallets and tools from Lisk SDK v3.

Both `ldpos-chain` and `leasehold-chain` are designed to work with [lisk-dex](https://github.com/Capitalisk/lisk-dex) - This means that any custom blockchain which is based on either of these two modules can be easily listed for trading on https://ldex.trading/ and also on any other compatible `lisk-dex` federation.

This guide focuses on how to launch a new custom blockchain based on the `ldpos-chain` module since that's the module which the Capitalisk blockchain is based on.

This guide assumes that the new custom blockchain symbol will be `foo` - You should substitute `foo` with your own blockchain symbol everywhere (including file names) as you go through this guide. The blockchain symbol (also called network symbol) is a unique symbol or acronym used to represent a blockchain (E.g. for listing on exchanges).

## 1. Requirements

### 1.1 A compatible LDEM node

To create a custom blockchain, you first need to have an [LDEM](https://github.com/Capitalisk/ldem) node - Any node which is based on the LDEM engine is fine; this includes a [Leasehold](https://www.leasehold.io/) node or a Capitalisk node. But for the purpose of this guide, it is recommended to use a Capitalisk node - So you should follow the guide [Setting up a new Capitalisk node](http://localhost:3000/docs/) to setup a node.

Once you have a working Capitalisk node, launching a new custom blockchain should only take between a few minutes to an hour and doesn't require any additional installation steps.

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

## 2. Create a new genesis file

Each blockchain needs to start from a genesis state. Blockchains based on `ldpos-chain` load their initial state from a genesis JSON file - It contains a list of accounts and balances which are present from the beginning of the blockchain as well as initial votes which determine who the initial forging delegates are.

For your custom blockchain, you will need to create your own `foo-genesis.json` file - You can add as many genesis accounts to it as you want with whatever balance amounts and votes you want.

Your `foo-genesis.json` file should follow the same structure as the `foo-genesis.json` file of the Capitalisk blockchain: https://gist.github.com/jondubois/6061f01168f793308621b77b16ee64c1

- Copy the `foo-genesis.json` file from the link above to your own computer.
- Change the `networkSymbol` to the symbol for your new blockchain (as you want it to appear on the DEX).
- Delete all the entries inside the `accounts` array; you will need to generate and add your own entries.

The simplest way to generate accounts is using `ldpos-commander` using this command:

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// TODO 222: Specify the chain symbol

```shell script
ldpos account generate
```

The output should look like this:

```
GENERATED WALLET AND PUBLIC KEYS:
{
  "passphrase": "correct subway helmet chalk degree object cargo inquiry window goddess monster remain",
  "address": "foo95bb3611a9796d2c4a1a352632331df4330987b8",
  "sigPublicKey": "95bb3611a9796d2c4a1a352632331df4330987b8329c2e0d5311af300e3d8e87",
  "multisigPublicKey": "162efd63a08938decdbf8543f064599857b0b69dad659bcf9864a264bdbaf252",
  "forgingPublicKey": "5d377d68e0eca7777d3b6b4d5b1eb1bf90f996bb4b63598a84f6300809d570ec"
}
```

You should run this command multiple times (e.g. 10 times); each time, it will create a new account; you should save all the details for each account in a safe place; it's important not to lose the passphrases of the genesis accounts as you will need them to run and secure the network in the beginning.

Once you have generated all your genesis accounts, you should add their addresses and public keys to the `foo-genesis.json` file inside the `accounts` array.

Each account entry should look like this:

```json
{
  "address": "foo95bb3611a9796d2c4a1a352632331df4330987b8",
  "type": "sig",
  "forgingPublicKey": "5d377d68e0eca7777d3b6b4d5b1eb1bf90f996bb4b63598a84f6300809d570ec",
  "nextForgingKeyIndex": 0,
  "multisigPublicKey": "162efd63a08938decdbf8543f064599857b0b69dad659bcf9864a264bdbaf252",
  "nextMultisigKeyIndex": 0,
  "sigPublicKey": "95bb3611a9796d2c4a1a352632331df4330987b8329c2e0d5311af300e3d8e87",
  "nextSigKeyIndex": 0,
  "balance": "10000000000000000",
  "votes": []
}
```

For each entry, you should substitute the `forgingPublicKey`, `multisigPublicKey` and `sigPublicKey` with the relevant values for each account you generated. Make sure that each account entry is separated by a comma (must be valid JSON).
You can change the `balance` of each account to suit your requirements; `1` token is `100000000` units so you need to ignore the last 8 zeroes in order to read the value in tokens - The example account above has a balance of `10 million` tokens.

It's strongly recommended that you add a sufficient number of accounts to your `foo-genesis.json` file to act as genesis delegates so that they take up `~66%` of all available forging slots - In the beginning, it's important that the majority of available delegate slots are controlled by a trusted party (e.g. yourself) so that you don't lose control over the network before it's in a desirable state.

Once you've defined all the genesis accounts and their starting balances, you will need to specify the genesis votes in order to choose the block forgers.
The simplest approach is to make one of the genesis accounts hold most (or all) of the total token supply (specified in the `balance` property) and make that account vote for itself as well as the other genesis accounts. To add votes, you just need to add a list of delegate addresses to the `votes` array of the relevant genesis voter account (e.g. the one with the most tokens).

For example:

```
"votes": ["foo95bb3611a9796d2c4a1a352632331df4330987b8", "foob32a9b7182ead076b6dafc7b59f903edf9ba1b19", "fooa2495cacc5b2b3d08a548e05f061827021581af3"]
```

It's recommended that the genesis voter account vote for all the delegate accounts which you created in order to take up the majority of available forging slots (make sure you control `~66%` of available forging slots). The voting could alternatively be done later (post-launch), but this is not recommended for most scenarios.

## 3. Create a new database

If using Postgres, you will need to create a new database to store the blockchain data.
If using SQLite, the database file will be created automatically so you can skip this step.

Create a new Postgres database. If your blockchain is called `foo` you may want to call it `foo_main` (for mainnet).
The following commands may be different depending on your Postgres setup (change `foo_main` with an appropriate database name):

```shell script
postgres createdb foo_main
```

If using the default `postgres` user, the command would be:

```shell script
sudo -u postgres createdb foo_main
```

## 4. Add a new custom module config object

```json
"foo_chain": {
  "modulePath": "node_modules/ldpos-chain",
  "genesisPath": "../../genesis/mainnet/foo-genesis.json",
  "components": {
    "logger": {
      "logFileName": "logs/mainnet/foo.log",
      "consoleLogLevel": "info",
      "fileLogLevel": "error"
    },
    "dal": {
      "libPath": "../ldpos-knex-dal",
      "client": "pg",
      "connection": {
        "host": "127.0.0.1",
        "user" : "postgres",
        "password" : "password",
        "database" : "capitalisk_main",
        "port": "5432"
      }
    }
  }
}
```

Substitute `foo` in `genesisPath` and `components.logger.logFileName` to with the symbol of your custom chain.

If you're using `sqlite`, the object under `dal` should look like this instead:

```json
"dal": {
  "libPath": "../ldpos-knex-dal",
  "client": "sqlite3",
  "connection": {
    "filename": "foo-db.sqlite3"
  }
}
```

Substitute `foo` with your custom chain symbol in `filename`.

## 5. Start your node

## 6. Get other nodes to join your new blockchain
