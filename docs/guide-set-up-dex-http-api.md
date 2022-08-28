---
id: guide-set-up-dex-http-api
title: Set up the DEX HTTP API
sidebar_label: Set up DEX HTTP API
slug: /set-up-dex-http-api
---

## 1. Requirements

### 1.1. Machine/instance requirements

- A machine/instance with a publicly exposed IP address (E.g. from a cloud service provider).
- 100GB of hard drive space is recommended (this should be enough for several years of data).
- All ports should be open for outbound TCP traffic.
- You will need to open a port of your choice for inbound TCP traffic (the HTTP API will be served on that port).

### 1.2. A compatible LDEM node with the relevant DEX HTTP API module installed

In order to expose the DEX HTTP API, you first need to have an LDEM node.
To set up a DEX node, follow the [Launch a custom DEX market](/docs/launch-custom-dex-market) guide or the [Join a custom DEX market](/docs/join-custom-dex-market) guide.

You will also need to install the `capitalisk-dex-http-api` module on your node - To do this, you should navigate to your node's main directory using the `cd` command (typically `capitalisk-core/`).
Once inside, you will need to install the module using this command:


```shell script
npm install capitalisk-dex-http-api --save
```

## 2. Add the relevant custom module config object

You will need to open your node's `config.json` file (inside your main `capitalisk-core` directory).
Inside this file, you should find a field called `modules` which is an array of module objects.

You will need to add a module to serve the HTTP API for your existing DEX module.

```json
"capitalisk_dex_foo_clsk_http_api": {
  "moduleEnabled": true,
  "modulePath": "node_modules/capitalisk-dex-http-api",
  "port": 8031,
  "enableCORS": true,
  "dexModuleAlias": "capitalisk_dex_foo_clsk",
  "components": {
    "logger": {
      "fileLogLevel": "error",
      "consoleLogLevel": "error"
    }
  }
}
```

After you've copied this object inside your `config.json` file, you need to change 3 properties/values:

- `port`: This is the port on which to serve the HTTP API. Make sure that this port is exposed to the public internet (directly or indirectly through a proxy or iptables port redirect) - It's strongly recommended that each DEX market aim to use a unique HTTP port and that participants of the same DEX market use the same port.
- `capitalisk_dex_foo_clsk_http_api` (replace `foo` with the relevant blockchain symbol)
- `dexModuleAlias` (in `capitalisk_dex_foo_clsk`, replace `foo` with the relevant blockchain symbol) - This needs to point to the module name of the DEX market on your node.

## 3. Start your node

You can start the node using PM2:

```shell script
pm2 start index.js --name "ldem-node" -o "/dev/null" -e "/dev/null"
```

If you get any errors, make sure that you don't have an existing node already running. If you do, you can shut it down using `pm2 delete ldem-node`.

You should check the logs using the following command:

```shell script
pm2 logs ldem-node
```

Depending on your log level, you may see a lot of messages which indicate that your node is catching up with the network.
If you see a lot of error messages, it could be an indication that something went wrong.
Compare your logs with existing DEX market participants to verify that your node is running correctly.

Press `Ctrl + C` to stop reading the logs.
