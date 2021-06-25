---
id: guide-join-custom-blockchain
title: Join a custom blockchain
sidebar_label: Join a custom blockchain
slug: /join-custom-blockchain
---

## Overview

This guide assumes that the custom blockchain symbol will be `foo` - You should substitute `foo` with the relevant blockchain symbol everywhere (including all file names) as you go through this guide. The blockchain symbol (also called network symbol) is a unique symbol or acronym used to represent a blockchain (E.g. for listing on exchanges).

## 1. Requirements

### 1.1 Machine/instance requirements

- A machine/instance with a publicly exposed IP address (E.g. from a cloud service provider).
- 100GB of hard drive space is recommended (this should be enough for several years of data).
- Port 8001 needs to be open for inbound TCP traffic.
- All ports should be open for outbound TCP traffic.

### 1.2 A compatible LDEM node

To create a custom blockchain, you first need to have an [LDEM](https://github.com/Capitalisk/ldem) node - Any node which is based on the LDEM engine is fine; this includes a [Leasehold](https://www.leasehold.io/) node or a Capitalisk node. But for the purpose of this guide, it is recommended to use a Capitalisk node - So you should follow the guide [Set up a new Capitalisk node](./) to setup a node. Make sure that you also have the `pm2` command installed globally on your node (`sudo npm install -g pm2`).

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

## 2. Add the genesis file to your node

You need to get a copy of the custom blockchain's genesis JSON file from existing network participants.
Once you have it, paste it in the file at the following (relative) path (`capitalisk-core` is the directory where your node's source code is located):

```
capitalisk-core/genesis/mainnet/foo-genesis.json
```

Remember to replace `foo` in the filename above with the symbol of the blockchain you want to join.

## 3. Create a new database

If using SQLite, the database file will be created automatically so you can skip this step.

If using Postgres, you will need to create a new database to store the blockchain data.

Create a new Postgres database. If the blockchain is called `foo` you may want to call it `foo_main` (for mainnet).
The following commands may be different depending on your Postgres setup (change `foo_main` with an appropriate database name for the relevant chain):

```shell script
postgres createdb foo_main
```

If using the default `postgres` user, the command would be:

```shell script
sudo -u postgres createdb foo_main
```

## 4. Add the relevant custom module config object

You will need to open your node's `config.json` file (inside your main `capitalisk-core` directory).
Inside this file, you should find a field called `modules` which is an array of module objects; these objects reference the module instances which will run on your node.

You will need to add the blockchain module config object which was provided to you by existing blockchain participants to your `config.json` file.
The object might look like this (though it will likely have some different values and properties):

```json
"foo_chain": {
  "modulePath": "node_modules/ldpos-chain",
  "genesisPath": "../../genesis/mainnet/foo-genesis.json",
  "components": {
    "logger": {
      "logFileName": "logs/mainnet/foo.log",
      "consoleLogLevel": "debug",
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

It's important that most of the properties and values in your module's config object match those of other nodes which participate in this blockchain network or else your node will not be able to reach consensus with the rest of the network.

The choice of database engine is one of the configurations which can be different on a node-by-node basis.
If you want to use SQLite instead of Postgres, the object under `dal` should look like this instead:

```json
"dal": {
  "libPath": "../ldpos-knex-dal",
  "client": "sqlite3",
  "connection": {
    "filename": "foo-db.sqlite3"
  }
}
```

Remember to substitute `foo` with the appropriate custom chain symbol in `filename`.

## 5. Start your node

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
Compare your logs with existing network participants to verify that your node is running correctly.

Press `Ctrl + C` to stop reading the logs.
