---
id: guide-setup
title: Setting up a new Capitalisk node
sidebar_label: Setup a new node
slug: /
---

## 1. Install essentials

```sh
sudo apt-get install build-essential python
```

## 2. Install Node.js

### 2.1 Installing using `nvm`

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

### 2.2 Installing via snap

```sh
sudo snap install node --channel=14/stable --classic
```

## 3. Install Postgres

### 3.1 Installing via Ubuntu repositories

```sh
sudo apt install postgresql
```

### 3.2 Installing via PostgreSQL repositories

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

## 4. Setup the Postgres database for the node

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

## 5. Install Git

- Full instructions can be found here: https://github.com/git-guides/install-git

```shell script
sudo apt-get install git-all
```

## 6. Clone and setup the capitalisk-core node

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

- Note that if you provided a custom password in step 3 instead of the default one (`'password'`), you will need to update the database details inside your main `capitalisk-core/config.json` file to match (so that the node is able to connect to your database).

## 7. Start the node

### 7.1 PM2

- You can start the node in multiple ways but the simplest way is to use `pm2`.
- You can install `pm2` with:

```shell script
npm install -g pm2
```

- Then launch the node with:

```shell script
pm2 start index.js --name "capitalisk-core" -o "/dev/null" -e "/dev/null"
```

### 7.2 Systemd

- You can add an entry to `systemd`, that way the system easily restarts the process both on failure and reboot.

Adding an entry to `systemd`:

```sh
sudo nano /lib/systemd/system/capitalisk-core.service
```

And paste:

```sh
[Unit]
Description=capitalisk-core
After=network.target
[Service]
Type=simple
User=<user>
# If using snap it should be /snap/bin/node ...
ExecStart=/bin/node /home/<user>/capitalisk-core/index.js
Restart=on-failure
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=capitalisk-core
[Install]
WantedBy=multi-user.target
```

Let's enable and restart the daemons:

```sh
sudo systemctl enable capitalisk-core
sudo systemctl daemon-reload
sudo systemctl restart rsyslog
```

Capitalisk will need a directory to write logs to. Using `systemd` it uses `/logs/mainnet`:

```sh
sudo mkdir -p /logs/mainnet
sudo chown -R <user>:<user> /logs
```

```sh
sude systemctl start capitalisk-core
```

And now you are all set!

## Restarting the node

- To restart the node, the command is:

```shell script
pm2 restart capitalisk-core
```

- Note that if you make any changes to the `config.json` file, you will need to restart the node for the changes to take effect.

## Stopping the node

- If you want to shut down the code, you can use the command:

```shell script
pm2 delete capitalisk-core
```

## Enabling logging for node

- Log level can be changed under the `logger` section of `config.json` under the `capitalisk_chain` module entry - Possible values include: `error`, `debug` or `info`.
