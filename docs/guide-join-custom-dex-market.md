---
id: guide-join-custom-dex-market
title: Join a custom DEX market
sidebar_label: Join a custom DEX market
slug: /join-custom-dex-market
---

## 1. Requirements

### 1.1 Hardware requirements

- A machine/instance with a publicly exposed IP address (E.g. from a cloud service provider).
- 100GB of hard drive space is recommended (this should be enough for several years of data).
- Port 8001 needs to be open for inbound TCP traffic.
- All ports should be open for outbound TCP traffic.

### 1.2 A compatible LDEM node

To create a custom blockchain, you first need to have an [LDEM](https://github.com/Capitalisk/ldem) node - Any node which is based on the LDEM engine is fine; this includes a [Leasehold](https://www.leasehold.io/) node or a Capitalisk node. But for the purpose of this guide, it is recommended to use a Capitalisk node - So you should follow the guide [Setting up a new Capitalisk node](./) to setup a node.

### 1.3 LDPoS Commander CLI

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

## 2. Add the relevant custom module config object

You will need to open your node's `config.json` file (inside your main `capitalisk-core` directory).
Inside this file, you should find a field called `modules` which is an array of module objects; these objects reference the module instances which will run on your node.

You will need to add the DEX market's module config object which was provided to you by existing DEX market participants to your `config.json` file.
The object might look like this (though it will likely have some different values and properties):

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

It's important that most of the properties and values in your module's config object match those of other nodes which participate in this DEX market or else your node will not be able to reach consensus with the rest of the network about the state of the decentralized order book and it will not be able to sign cross-chain trades or collect dividends.

## 3. Start your node

You can start the node using PM2:

```shell script
pm2 start index.js --name "ldem-node" -o "/dev/null" -e "/dev/null"
```

You should check the logs using the following command:

```shell script
pm2 logs ldem-node
```

Depending on your log level, you may see a lot of messages which indicate that your node is catching up with the network.
If you see a lot of error messages, it could be an indication that something went wrong.
Compare your logs with existing DEX market participants to verify that your node is running correctly.

Press `Ctrl + C` to stop reading the logs.
