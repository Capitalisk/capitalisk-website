---
id: wallet
title: Wallet
---

## Desktop and web wallet (LDPoS Wallet)

### Overview

LDPoS Wallet is a desktop and web browser application for browsing and interacting with the Capitalisk blockchain - It also supports other blockchains built with Capitalisk's LDPoS technology.

### Hosted web wallet

Official web interface: https://capitalisk.com/wallet/ldpos/  
The hosted web wallet also acts as a block explorer.

### Desktop wallet

Download and run from source on your PC: https://github.com/Capitalisk/ldpos-wallet

## CLI client (LDPoS Commander)

### Overview

LDPoS Commander is an interactive command line (CLI) client for browsing and interacting with the Capitalisk blockchain - It also supports other blockchains built with Capitalisk's LDPoS technology.
Because LDPoS uses a stateful signature scheme over a stateful WebSocket connection, LDPoS commander is interactive.
Once LDPoS Commander is connected and authenticated, it's possible to issue multiple commands without having to re-authenticate each time.

### Installation steps

1. Make sure that you have `Node.js` installed (version `v14.16.0` minimum) - You can install it from the following website: https://nodejs.org/en/
2. Run the following command in your bash terminal: `npm install -g ldpos-commander`

### Usage

To launch the `ldpos-commander` client, run the following command in your terminal:

```
ldpos
```

You can also add a `--help` flag (non-interactively) to get a list of all available commands and options (both interactive and non-interactive).

After the interactive session has been started, you can get the full list of available commands using the `help` command.

### GitHub

https://github.com/Capitalisk/ldpos-commander
