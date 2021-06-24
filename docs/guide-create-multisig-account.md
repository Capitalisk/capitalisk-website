---
id: guide-create-multisig-account
title: Create a multisig account
sidebar_label: Create a multisig account
slug: /create-multisig-account
---

## 1. Requirements

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

## 2. Connect LDPoS client to a relevant blockchain node

Connect to a blockchain node with this command:

### 2.1. Connect the LDPoS client

```shell script
ldpos -c
```

It will prompt you for the following details:

- `Server IP`: The IP address of a node which participates in the target blockchain.
- `Port`: The port number to use to connect to the blockchain node - Usually `8001`.
- `Chain Module Name`: The name of the blockchain module (as defined in the `config.json` file) - Typically in the form `foo_chain` (replace `foo` with the relevant blockchain name).
- `Network Symbol`: The unique blockchain symbol. For example `clsk` - This symbol is defined inside the `genesis.json` file of the target blockchain.

This should connect your client to the blockchain node. Then it will prompt you for commands.
You can type `help` at any time to see the full list of available commands.

To create a multisig wallet on the target blockchain, you first need to create a new regular account:

### 2.2. Make sure that all participating members have setup their multisigPublicKey

In order to add other accounts as members of a multisig account, you first need to make sure that each of those accounts has registered a `multisigPublicKey` (this is the public key which will be used to verify the member's signatures).
If some member accounts do not have a multisig public key, then the multisig account registration in the next step (`2.5`) will not work - The transaction will still be processed and fees will be charged but it will be a no-op.

To avoid wasting tokens on invalid transactions, you should check that each member account address has registered a personal `multisigPublicKey`.
You can check this using the following command:

```
account get
```

It will prompt you for the prospective member's account address.
The output might look like this:

```
{
  "address": "clsk65d1fcabf86fc5eef5844b6065d786be4ec3fcd9",
  "type": "sig",
  "balance": "49999.1",
  "forgingPublicKey": null,
  "multisigPublicKey": null,
  "nextMultisigKeyIndex": null,
  "sigPublicKey": "65d1fcabf86fc5eef5844b6065d786be4ec3fcd96a6a59e604a949f563f11483",
  "nextSigKeyIndex": 9,
  "requiredSignatureCount": null,
  "nextForgingPublicKey": null,
  "nextForgingKeyIndex": null,
  "nextMultisigPublicKey": null,
  "nextSigPublicKey": "3676a6f3e83bb39006d5e9bdfa333e8e921a3859ac22b6cd185ad1155c94517e",
  "updateHeight": 267,
  "lastTransactionTimestamp": 1623159317377
}
```

In this case, the account `clsk65d1fcabf86fc5eef5844b6065d786be4ec3fcd9` does not have a `multisigPublicKey` (`multisigPublicKey` is `null`).
If the `multisigPublicKey` was set, you would see a string of letters and numbers next to it (similar to `sigPublicKey`).

If the prospective member has not yet registered a multisig public key, you will need to ask them to do this before you can proceed to the next step.
To register a `multisigPublicKey`, they will need to log into their personal account using the `login` command (making sure to connect to the correct blockchain) and then execute the following command:

```
transaction post register-multisig-details
```

They can either specify a new passphrase or re-use their personal account's main passphrase as the multisig passphrase.
Once all prospective members have individually registered a `multisigPublicKey` key on their personal accounts, you can continue with the next step to register the main multisig account.

### 2.3. Create a new account to convert to a multisig account

```
account generate
```

It will prompt you for:

- `Network symbol`: Should be the same as you used when you launched the client.

Then it should output an object like this:

```json
{
  "address": "clsk3eb73e275ad98ddf8e2e0394be4310003577500f",
  "passphrase": "dumb more raw rib april invite time absorb reduce shine cycle cargo",
  "sigPublicKey": "3eb73e275ad98ddf8e2e0394be4310003577500f497c6630fb3cef83fac4fcfd",
  "multisigPublicKey": "6cfc113f44e9929eefa1224dd84e357d6c48c86bb9529961cbc3ac084e6f0fcd",
  "forgingPublicKey": "30738a97f26d8a72e5a40a51db8f2ca8ade4c2f5d0479f07e3b5259e28939777"
}
```

### 2.4. Send some tokens to the new account to pay for multisig registration fees

You will need to ask someone who already has some tokens to send some to the new (future multisig) account or send them from a different account.

You can send tokens using the `ldpos` command by first logging into the account which has the tokens:

```
login
```

Then make the transfer:

```
transaction post transfer
```

You should provide the address of the new (future multisig account) which you generated in the previous step (`2.3`) as the recipient.
You only need to send enough tokens to cover the multisig registration fees - This depends on the number of wallet members.
For Capitalisk and LDPoS-based blockchains, `10` tokens is typically enough for most cases.

Once you posted the transfer, you just need to wait for it to go through.
In Capitalisk and LDPoS-based blockchains, it will typically take 30 seconds (enough time for the next block to be produced).

### 2.5. Convert the new account into a multisig account

After you waited about 30 seconds, you should log into the new account which you want to convert into a multisig account - The one which you just sent some tokens to in the previous step (`2.4`).

```
login
```

If the account has not yet received tokens, it will show you an error. You may need to wait for the tokens to arrive.
If the transaction failed for whatever reason, you may need to go through step `2.3` again.

Once login is successful, register the account as a multisig account with this command:

```
transaction post register-multisig-wallet
```

It will prompt you for the following details:

- `Count of memberAddresses to be added`: The total number of members in this wallet.
- `Member address`: The account address of a member - It will keep prompting you for each member, one at a time.
- `Required signature count`: The number of members who need to sign for a transaction to be sent from the multisig account.
- `Message (optional)`: A message to include in the transaction - You can leave this blank (press enter).
- `Fee (Default: 2.5)`: The client will calculate a default minimum fee based on the number of members. You can leave this blank (press enter) to use the default.

Then you need to wait until the transaction is included in a block (typically about 30 seconds).
You can check if the multisig wallet was registered successfully by running the following command:

```
account get
```

It will prompt you for:

- `Wallet address`: The wallet address of the future multisig account.

If the registration was successful, the `type` property should be `multisig`.
