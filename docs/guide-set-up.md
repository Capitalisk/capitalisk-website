---
id: guide-set-up
title: Set up a new Capitalisk node
sidebar_label: Set up a new node
slug: /
---

## 1. Machine/instance requirements

- A machine/instance with a publicly exposed IP address (E.g. from a cloud service provider).
- 100GB of hard drive space is recommended (this should be enough for several years of data).
  - OPTIONAL: To reduce node costs, block storage be mounted to run a cheaper node. The disk space can be increased over time.
- Port 8001 needs to be open for inbound TCP traffic.
- All ports should be open for outbound TCP traffic.

## 2. Install Node.js

Install either `nvm` or `node`.

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

> **NOTE:** Not recommended for machines with low disk space.

```sh
sudo snap install node --channel=12/stable --classic
```

## 3. Install Git

- Full instructions can be found here: https://github.com/git-guides/install-git

```shell script
sudo apt-get install git-all
```

## 4. Clone and set up the capitalisk-core node

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

## 5. Capitalisk node supports multiple databases

- As of now, following databases are supported

1. SQLite - Ready to use out of the box.
2. Postgres - Need to install and configure separate postgres service.

## 5.1 Installing SQLite

- SQLite binaries are automatically installed as a part of `npm install` or `yarn install`.
- Just make sure, no warning or error is thrown while installing npm packages for `sqlite3`.

## 5.2 Install Postgres

### 5.2.1 Installing via Ubuntu repositories

```sh
sudo apt install postgresql
```

### 5.2.2 Installing via PostgreSQL repositories

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

## 5.2.3 Set up the Postgres database for the node

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

## 6. Setting up and starting the node

Either with `PM2` or `systemd`.

### 6.1 PM2

- You can start the node in multiple ways but the simplest way is to use `pm2`.
- You can install `pm2` with:

```shell script
npm install -g pm2
```

- Launch the node with PM2:

```shell script
pm2 start index.js --name "capitalisk-core" -o "/dev/null" -e "/dev/null"
```

- Make sure log size doesn't exceed storage capacity of the machine.
- PM2 doesn't have a native check for maximum log file size, so it can terminate node due to log size exceeding storage capacity
- Install [PM2 log rotation module](https://github.com/keymetrics/pm2-logrotate), to limit log size and allow log file rotations.

```
  pm2 install pm2-logrotate
```

- Default max log file size limit is 10MB after module is installed, follow official README to change the limit.

### 6.2 Systemd

- You can add an entry to `systemd`, that way the system easily restarts the process both on failure and reboot.

Adding an entry to `systemd`:

```sh
sudo nano /lib/systemd/system/capitalisk-core.service
```

And paste, substitute `<user>` with your user:

```sh
[Unit]
Description=capitalisk-core
After=network.target
[Service]
Type=simple
User=<user>
# If using snap it should be /snap/bin/node ...
# If using node it should be /bin/node
# This is an example with NVM:
ExecStart=/home/<user>/.nvm/versions/node/v12.18.2/bin/node /home/<user>/capitalisk-core/index.js
Restart=on-failure
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=capitalisk-core
WorkingDirectory=/home/<user>/capitalisk-core
[Install]
WantedBy=multi-user.target
[Unit]
Description=capitalisk-core
After=network.target
[Service]
Type=simple

User=<user>
```

Let's enable and restart the daemons:

```sh
sudo systemctl enable capitalisk-core
sudo systemctl daemon-reload
sudo systemctl restart rsyslog
```

```sh
sude systemctl start capitalisk-core
```

And now you are all set!

## 7.1 Restarting the node

- To restart the node, the command is:

```shell script
pm2 restart capitalisk-core
```

or

```sh
sudo systemctl restart capitalisk-core
```

- Note that if you make any changes to the `config.json` file, you will need to restart the node for the changes to take effect.

## 7.2 Stopping the node

- If you want to shut down the code, you can use the command:

```shell script
pm2 delete capitalisk-core
```

or

```sh
sudo systemctl stop capitalisk-core
```

> **NOTE:** `capitalisk-core` via systemd will always restart on reboot until you disable the process `sudo systemctl disable capitalisk-core`.

## 7.3 Enabling logging for node

- Log level can be changed under the `logger` section of `config.json` under the `capitalisk_chain` module entry - Possible values include: `error`, `debug` or `info`.
- To easily track the logs you can use `tail -f <path>/<to>/<logs>`
- Get specific information about a delegate `cat ~/capitalisk-core/logs/mainnet/clsk.log | grep "<address>"`

Alternatively all logs can be enabled and truncated via `crontab -e`:

```
*/30 * * * * truncate -s 0 ~/capitalisk-core/logs/mainnet/clsk.log
*/30 * * * * truncate -s 0 ~/capitalisk-core/logs/mainnet/default.log
*/30 * * * * truncate -s 0 ~/capitalisk-core/logs/mainnet/lsk.log
*/30 * * * * truncate -s 0 ~/capitalisk-core/logs/mainnet/dex-clsk-lsk.log
```

This truncates the logs [every 30 minutes](https://crontab.guru/#*/30_*_*_*_*).

## 8. Check status of the node

### 8.1 Using ldpos-commander (https://github.com/Capitalisk/ldpos-commander)

- Install ldpos commander using

```shell script
npm i -g ldpos-commander
```

- Run below command to get node block height, since node is syncing, height should keep changing. i.e. Should keep increasing

```shell script
ldpos IP_ADDRESS:8001 block get max-height
```

PS. Please change port, if changed in the config.

### 8.2 Using logs

- By default, CLSK node should work without any issues.
- Observing errors on the node:
  - PM2: If `pm2 ls` shows red status for any of the spawned process, it means we need to check logs for exact error.
  - `systemd`: `cat ~/capitalisk-core/logs/mainnet/clsk.log | grep "<statement>"`; replace statement with your search query.
- Edit either `config.json` (in case of postgres) or `config.sqlite.json` (in case of SQLite) using nano, and replace `error` with `info` for logging, save file.
- Verifying the node is synching and working:
  - PM2: Run `pm2 logs`, one of the statements should contain `Received valid block ...`.
  - ` systemd``: Run  `tail -f ~/capitalisk-core/logs/mainnet/clsk.log | grep "Received valid block ..."`. If the entries are increasing the node is synching successfully.

If you want to monitor the `systemd` process you can alternative add an additional entry:

```
sudo nano /etc/rsyslog.d/capitalisk-core.conf
```

```
if $programname == 'capitalisk-core' then /var/log/capitalisk-core.log
& stop
```

```
sudo systemctl daemon-reload
sudo systemctl restart rsyslog
```

Then you can track any log via:

```
tail -f /var/log/capitalisk-core.log
```

> **NOTE:** You will need to truncate this logs via `sudo crontab -e`!

### 9. Adding a forging passphrase

In the `config.json`:

```json
...
"capitalisk_chain": {
  "modulePath": "node_modules/ldpos-chain",
  "genesisPath": "../../genesis/mainnet/genesis.json",
  "forgingCredentials": [
    {
      "forgingPassphrase": "passphrase goes here"
    }
  ]
}
...
```
