---
id: guide-setup
title: Setting up a Capitalisk node
sidebar_label: Capitalisk
slug: /
---

## Install Node.js

- Follow https://github.com/nvm-sh/nvm to install nvm:
```shell script
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
```
```shell script
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```
```shell script
nvm install 12.18.2
```
- To install nvm on windows, follow https://github.com/coreybutler/nvm-windows

## Install Postgres

- Follow https://www.postgresql.org/download/ to install Postgres on linux/windows/mac.

- Steps for Linux Ubuntu/Debian are:

```shell script
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
```
```shell script
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
```
```shell script
sudo apt-get update
```
```shell script
sudo apt-get -y install postgresql
```

## Setup the Postgres database for the node

- Log into postgres:
```shell script
sudo -u postgres psql -U postgres
```
- Set the password for the `postgres` user:
```
ALTER USER postgres WITH PASSWORD 'password';
```
- Create a new database to hold all the blockchain data:
```
create database capitalisk_main;
```
- Exit the Postgres prompt:
```
\q
```
- Restart the Postgres service
```
sudo service postgresql restart
```

## Clone and setup the capitalisk-core node

- Install git (see full instructions here: https://github.com/git-guides/install-git)
```shell script
sudo apt-get install git-all
```
- Clone the Git repo to your host:
```shell script
git clone https://github.com/Capitalisk/capitalisk-core
```
- Change directory to the project root:
```shell script
cd capitalisk-core
```
- Install Node.js dependencies:
```shell script
npm install
```

## Start the node

- You can start the node in multiple ways but the simplest way is to use `pm2`.
- You can install `pm2` with:
```shell script
npm install -g pm2
```
- Then launch the node with:
```
pm2 start index.js --name "capitalisk-core" -o "/dev/null" -e "/dev/null"
```

## Restarting the node

- To restart the node, the command is:
```
pm2 restart capitalisk-core
```
- Note that if you make any changes to the `config.json` file, you will need to restart the node for the changes to take effect.

## Stopping the node

- If you want to shut down the code, you can use the command:
```
pm2 delete capitalisk-core
```

## Enabling logging for node

- Log level can be changed under the `logger` section of `config.json` under the `capitalisk_chain` module entry - Possible values include: `error`, `debug` or `info`.
