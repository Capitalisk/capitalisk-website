---
id: guide-setup-ldem
title: Setting up on an existing node
sidebar_label: Setup on an existing node
slug: /setup-ldem
---

## Overview

Capitalisk can be setup as a module on any [LDEM](https://github.com/Capitalisk/ldem) node such as a [Leasehold](https://leasehold.io/) node.
It allows a single node to participate in multiple blockchains at the same time; this feature allows DEX markets to be created between those blockchains.

## 1. Install necessary modules

Navigate to your existing `LDEM` node's main working directory.
For a Leasehold `LDEM` node, the directory is usually called `leasehold-core-mainnet/` or `leasehold-core/`.

Then, once inside, execute the following commands:

```shell script
npm install ldpos-chain --save
```

```shell script
npm install ldpos-knex-dal --save
```

## 2. Add the Capitalisk genesis.json file to your node

While still inside your node's main working directory, create a new directory to hold the `genesis.json` file for Capitalisk:

```shell script
mkdir -p genesis/mainnet
```

Then, inside this new `genesis/mainnet/` directory, create a new file called `genesis.json` and paste the content of the following file inside of it:

https://gist.github.com/jondubois/6061f01168f793308621b77b16ee64c1

## 3. Create a new database for Capitalisk

Create a new Postgres database called `capitalisk_main`.
The following commands may be different depending on your Postgres user details:

```shell script
postgres createdb capitalisk_main
```

If using the default `postgres` user, the command would be:

```shell script
sudo -u postgres createdb capitalisk_main
```

Capitalisk also supports the SQLite database but that's a topic for a different guide.

## 4. Add the Capitalisk module config

Inside your node's main working directory, there should be a file called `config.json`; inside it, there should be a `modules` array which holds configurations for each of the modules which are running on your node. You should add the following config object to this `modules` array:

```json
"capitalisk_chain": {
  "modulePath": "node_modules/ldpos-chain",
  "genesisPath": "../../genesis/mainnet/genesis.json",
  "components": {
    "logger": {
      "logFileName": "logs/mainnet/clsk.log",
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

Make sure that each object in your `config.json` file is separated with a comma (and is valid JSON) or else the node will fail to launch.

You will need to modify the properties above inside the `dal.connection` object to make it point to your Postgres database; make sure that the `host`, `user`, `password` and `port` properties are correct based on your node's current setup.

Make sure that the `genesisPath` property points to the path of the Capitalisk `genesis.json` file which you created in step 2 (default above should be fine in most cases).
All paths in this module's config are relative to the `modulePath`; in this case; `node_modules/ldpos-chain/`.

## 5. Restart your node

If using `pm2`, make sure that you `pm2 delete` any previous instances of your node to make sure that you'll be launching the node with the latest source code (with the new modules).
You should watch the logs using the `pm2 logs` command to see your node's `capitalisk_chain` module catching up with the rest of the Capitalisk network.

You can modify the `consoleLogLevel` from the `config.json` file on a per-module basis if some of your modules are producing too much (or not enough) output.