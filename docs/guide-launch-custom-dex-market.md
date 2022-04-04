---
id: guide-launch-custom-dex-market
title: Launch a custom DEX market
sidebar_label: Launch a custom DEX market
slug: /launch-custom-dex-market
---

## Overview

This guide will show you how to set up a custom DEX market on an existing node to facilitate decentralized trading between two different tokens.
A DEX market is a kind of Decentralized Autonomous Organization (DAO) - It runs by itself without requiring any manual intervention and it automatically distributes profits to its members on a schedule.

This guide assumes that your node participates in the 2 blockchains across which you want to faciliate trading.
One of these chains (`clsk`) will be referred to as the 'base chain' and the other (`foo`) will be referred to as the 'quote chain'.
As you go through this guide, you should substitute `foo` with your own blockchain symbol everywhere (including all file names).

## 1. Requirements

### 1.1. Machine/instance requirements

- A machine/instance with a publicly exposed IP address (E.g. from a cloud service provider).
- 100GB of hard drive space is recommended (this should be enough for several years of data).
- Port 8001 needs to be open for inbound TCP traffic.
- All ports should be open for outbound TCP traffic.

### 1.2. A compatible LDEM node with the relevant chain modules installed

To create a custom DEX market, you first need to have an [LDEM](https://github.com/Capitalisk/ldem) node - Any node which is based on the LDEM engine is fine; this includes a [Leasehold](https://www.leasehold.io/) node or a Capitalisk node. But for the purpose of this guide, it is recommended to use a Capitalisk node - So you should follow the [Set up a new Capitalisk node](/docs/) guide to set up a node. Make sure that you also have the `pm2` command installed globally on your node (`sudo npm install -g pm2`).

For a node to provide a DEX market between 2 different blockchains, it needs to participate in both of those blockchains - This means that your node needs to run an instance of both chain modules.
Since a Capitalisk node already supports the `clsk` blockchain by default, you only need to set up 1 additional blockchain module - You can either launch this new blockchain or join an existing one.

- To launch a new custom blockchain, you should follow the [Launch a custom blockchain](/docs/launch-custom-blockchain) guide.
- To join an existing blockchain, you should follow the [Join a custom blockchain](/docs/join-custom-blockchain) guide.

Once you have set up the relevant chain module and your node is in sync with both blockchains (base chain and quote chain), you can start setting up your DEX market.

### 1.3. The lisk-dex module

Once you have an LDEM node set up, navigate to the node's main directory (e.g. the `capitalisk-core` directory), then execute the following command:

```shell script
npm install lisk-dex
```

This will install the `lisk-dex` module which will allow your node to operate as a DEX node.

### 1.4. LDPoS Commander CLI

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

In order to process trades across two different blockchains, the DEX needs to have one multisig address on each of those blockchains.
LDPoS Commander is recommended for creating the necessary multisig accounts.

## 2. Register multisig wallets

A DEX market needs to have a mutisignature (multisig) account on each of the 2 blockchains which it integrates with.
A multisig account is an account which requires signatures from multiple members in order to make any transactions - It's like a blockchain-based bank account for your DAO.
Multisig accounts can be set up with different rules which determine who the members are (based on their personal account addresses) and how many of them need to sign a transaction for it to be considered valid.

Follow the [Create a multisig account](/docs/create-multisig-account) guide to create a multisig account on each affected chain.
You will need to create one on the `clsk` blockchain (the base chain) and one on the `foo` blockchain (the one you want to use as the quote chain).
It's strongly recommended that both multisig accounts have the same set of people as members.
It's also strongly recommended that each multisig account be set up to require signatures from more than 50% of its members.

## 3. Add a new custom module config object

You will need to open your node's `config.json` file (inside your main `capitalisk-core` directory).
Inside this file, you should find a field called `modules` which is an array of module objects.

You will need to add the following object inside the `modules` array alongside existing entries:

```json
"lisk_dex_foo_clsk": {
  "moduleEnabled": true,
  "modulePath": "node_modules/lisk-dex",
  "passiveMode": false,
  "dexEnabledFromHeight": 12345,
  "signatureBroadcastDelay": 15000,
  "transactionSubmitDelay": 5000,
  "multisigExpiry": 86400000,
  "multisigExpiryCheckInterval": 600000,
  "orderBookSnapshotFilePath": "./dex-snapshot-foo-clsk.json",
  "orderBookSnapshotBackupDirPath": "./dex-snapshot-foo-clsk-backups",
  "orderBookSnapshotFinality": 29,
  "orderBookSnapshotBackupMaxCount": 24,
  "baseChain": "clsk",
  "priceDecimalPrecision": 2,
  "readBlocksInterval": 3000,
  "components": {
    "logger": {
      "fileLogLevel": "debug",
      "consoleLogLevel": "debug"
    }
  },
  "chains": {
    "clsk": {
      "moduleAlias": "capitalisk_chain",
      "chainCryptoLibPath": "../ldpos-chain-crypto",
      "multisigAddress": "7929826179931699287L",
      "memberAddress": "4738410848285516033L",
      "passphrase": "gorilla fancy token now rabbit orphan exist orbit essay butter rug grape",
      "requiredConfirmations": 0,
      "orderHeightExpiry": 20250,
      "readMaxBlocks": 1000,
      "exchangeFeeBase": "20000000",
      "exchangeFeeRate": 0.01,
      "minOrderAmount": "1000000000",
      "dividendStartHeight": 0,
      "dividendHeightInterval": 20250,
      "dividendHeightOffset": 2,
      "dividendRate": 0.9,
      "minPartialTake": "200000000"
    },
    "foo": {
      "moduleAlias": "foo_chain",
      "chainCryptoLibPath": "../ldpos-chain-crypto",
      "multisigAddress": "6535469681290206175L",
      "memberAddress": "10670116278626911259L",
      "passphrase": "phrase reduce peanut industry zoo deny toilet gasp fancy material claw resist",
      "requiredConfirmations": 0,
      "orderHeightExpiry": 20250,
      "readMaxBlocks": 1000,
      "exchangeFeeBase": "20000000",
      "exchangeFeeRate": 0.01,
      "minOrderAmount": "1000000000",
      "dividendStartHeight": 0,
      "dividendHeightInterval": 20250,
      "dividendHeightOffset": 2,
      "dividendRate": 0.9,
      "minPartialTake": "200000000"
    }
  }
}
```

Make sure that each module object inside the `modules` array is separated by a comma (the `config.json` file needs to be valid JSON).

In the above object, you will need to substitute `foo` with the symbol of your custom chain throughout:

- The module name (`lisk_dex_foo_clsk`)
- The value of `orderBookSnapshotFilePath` (`./dex-snapshot-foo-clsk.json`)
- The value of `orderBookSnapshotBackupDirPath` (`./dex-snapshot-foo-clsk-backups`)
- The `chains.foo` property (the `foo` property inside the `chains` object)
- The value of `chains.foo.moduleAlias` (`foo_chain`) - Make sure that it refers to the name of the module which you want to use as the quote chain.

You will also need to modify other fields above based on your DEX market's specific requirements.
The most important ones are:

- `dexEnabledFromHeight`: This is the block height (on the mainchain - `clsk` in this case) from which your DEX market should start processing trades. Ideally it should be height in the recent past; it can be any height in the past, but ideally not too far back or else your DEX will waste computational resources processing blocks which don't contain any DEX orders.
- `orderBookSnapshotFilePath`: The path of the file where the DEX stores the order book snapshot - Snapshots are useful for processing (or re-processing) the DEX history from an earlier point in time.
- `orderBookSnapshotBackupDirPath`: The path of a directory where to store the most recent order book snapshots.
- `orderBookSnapshotFinality`: The number of blocks (interval) to wait before producing a new DEX order book snapshot. With `clsk` as the base chain, 29 blocks is approximately 1 hour.
- `orderBookSnapshotBackupMaxCount`: The number of most recent snapshot files to keep inside the `orderBookSnapshotBackupDirPath` directory - In this case we hold onto 24 snapshots which is one day's worth. It's recommended that you also backup old snapshot files manually from time to time.
- `baseChain`: This is the symbol of the blockchain to use as the base chain for the DEX market.
- `priceDecimalPrecision`: The number of decimal points which the DEX market supports as the price (smaller amounts will be rounded).
- `components.logger.fileLogLevel` and `components.logger.consoleLogLevel`: The amount of detail to include in the logs for this DEX market. For production, `error` is recommended, however, when running the DEX module for the first time, `debug` is better as it allows you to see in more detail if everything is working correctly.
- `chains.clsk.multisigAddress`: The address of your DEX market's multisig account on the `clsk` blockchain (this is not your personal/member account, but the account which belongs to the DEX market itself). See step `#2` about setting up a multisig wallet.
- `chains.clsk.memberAddress`: The address of your personal account which is a member of the DEX's multisig account on the `clsk` blockchain. See step `#2` about setting up a multisig wallet.
- `chains.clsk.passphrase`: The passphrase of your personal `memberAddress` account.
- `chains.clsk.orderHeightExpiry`: The height increment after which to expire (and refund) orders sitting on the order book - `20250` is approximately 1 month (recommended).
- `chains.clsk.exchangeFeeBase`: A flat fee to charge each outgoing transaction on the `clsk` blockchain. This amount is specified in the smallest possible units.
- `chains.clsk.exchangeFeeRate`: The rate (percentage / 100) to charge on trades on the `clsk` blockchain in addition to the base fee.
- `chains.clsk.minOrderAmount`: The minimum order amount of tokens `clsk`. This amount is specified in the smallest possible units.
- `chains.clsk.dividendHeightInterval`: The block height interval to use to calculate and distribute DEX dividends (collected from DEX fees).
- `chains.clsk.dividendRate`: The rate (percentage / 100) of collected DEX fees to distribute as dividends - `0.9` (90%) is recommended to keep 10% aside as a safety margin.
- `chains.clsk.minPartialTake`: The minimum amount of tokens which can be taken out of a partially matched order on the `clsk` blockchain. This amount is specified in the smallest possible units. This property is necessary to prevent malicious counterparties from matching and taking tiny chunks out of other users' orders in an attempt to waste everyone's tokens on blockchain fees. It's recommended that this value is set to 10 times the value of `chains.clsk.exchangeFeeBase`.
- `chains.foo.multisigAddress`: The address of your DEX market's multisig account on the `foo` blockchain (this is not your personal account, but the account which belongs to the DEX market itself).
- `chains.foo.memberAddress`: The address of your personal account which is a member of the DEX's multisig account on the `foo` blockchain. See step `#2` about setting up a multisig wallet.
- `chains.foo.passphrase`: The passphrase of your personal `memberAddress` account.
- `chains.foo.orderHeightExpiry`: The height increment after which to expire (and refund) orders sitting on the order book - `20250` is approximately 1 month (recommended).
- `chains.foo.exchangeFeeBase`: A flat fee to charge each outgoing transaction on the `foo` blockchain. This amount is specified in the smallest possible units.
- `chains.foo.exchangeFeeRate`: The rate (percentage / 100) to charge on trades on the `foo` blockchain in addition to the base fee.
- `chains.foo.minOrderAmount`: The minimum order amount of tokens `foo`. This amount is specified in the smallest possible units.
- `chains.foo.dividendHeightInterval`: The block height interval to use to calculate and distribute DEX dividends (collected from DEX fees).
- `chains.foo.dividendRate`: The rate (percentage / 100) of collected DEX fees to distribute as dividends - `0.9` (90%) is recommended to keep 10% aside as a safety margin.
- `chains.foo.minPartialTake`: The minimum amount of tokens which can be taken out of a partially matched order on the `foo` blockchain. This amount is specified in the smallest possible units. This property is necessary to prevent malicious counterparties from matching and taking tiny chunks out of other users' orders in an attempt to waste everyone's tokens on blockchain fees. It's recommended that this value is set to 10 times the value of `chains.foo.exchangeFeeBase`.

## 4. Set up DEX HTTP API

You should follow the [Set up DEX HTTP API](/docs/set-up-dex-http-api) guide to expose your DEX market's HTTP API.
The HTTP API is necessary if you want people to connect to your node and trade through it using the [LDEX trading application](https://ldex.trading/trade/).

## 5. Start your node

You can start the node using PM2:

```shell script
pm2 start index.js --name "ldem-node" -o "/dev/null" -e "/dev/null"
```

If you get any errors, make sure that you don't have an existing node already running. If you do, you can shut it down using `pm2 delete ldem-node`.

You should check the logs using the following command:

```shell script
pm2 logs ldem-node
```

If you see a lot of error messages, it could be an indication that something went wrong.
The logs should also tell you which module the message comes from - You should mostly concern yourself with messages from the `lisk_dex_foo_clsk` module.
You can change the `fileLogLevel` and `consoleLogLevel` in the `lisk_dex_foo_clsk` module config to `debug` or `error` depending on your requirements. Detailed logs consume more disk space.

## 6. Get other nodes to join your new DEX federation

You will need to provide participants with the following things:

- A copy of your module config object from step `#3` but **[IMPORTANT] make sure that you remove ALL OCCURRENCES of your personal member passphrase and memberAddress from the config object first (from each of the two chains)!** - Each DEX member will need to replace those values with their own `memberAddress` and `passphrase`.
- A link to this guide: [Join a custom DEX market](/docs/join-custom-dex-market).

You may want to provide additional assistance to new participants depending on their technical abilities; it can be helpful to compare logs with other participants to ensure that their nodes are running correctly.

If you run into any issues that you can't figure out, you can reach out to DEX node operators from the Leasehold or Capitalisk community.
