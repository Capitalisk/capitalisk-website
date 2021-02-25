## Capitalisk Whitepaper

## 1. Purpose

### 1.1 Vision

Capitalisk (CLSK) was designed from the ground up to have the following characteristics:

- Maximum compatibility with LDEX (https://ldex.trading/) and other federations built with the `lisk-dex` SDK.
- Simple DPoS (Delegated Proof of Stake) consensus with instant finality.
- Deflationary token supply.
- Signature scheme which is resistant to quantum algorithms.
- Signature scheme which is stateful and supports features such as changing wallet passphrases.
- Serves as a fundraising platform for new tokens to be listed on LDEX.
- Serves as a blueprint for future Lisk and Leasehold sidechains.

### 1.2 How does Capitalisk fit into the Lisk and Leasehold ecosystems?

Capitalisk is intended to serve as a general-purpose community token for `LDEX`.
`LDEX` is a federation of DEX validators/members from the Lisk and Leasehold community who provide a trading service between multiple blockchains across the Lisk and Leasehold ecosystems.

### 1.3 How will CLSK tokens be distributed?

The team behind Capitalisk does not intend to sell any CLSK; instead, all tokens will be airdropped to Leasehold investors and Lisk voters according to the following allocation:

- 60% to Leasehold token holders.
- 20% to Lisk token holders who vote for all 10 members of `Lisk Initiative` on the new Lisk v3 blockchain.
- 10% to Lisk token holders who vote for both `jong` and `savetheworld` delegates on the new Lisk v3 blockchain.
- 10% to Leasehold directors, LDEX members and Capitalisk contributors.

Except for the last 10% of the allocation, the amount of CLSK distributed to each individual will be proportional to the amount of LSH or LSK tokens in their wallets at the time of the CLSK distribution. It's possible to qualify under multiple categories.

## 2. Technology

### 2.1 Overview

Capitalisk is the first token built on top of LDPoS; a set of modules which implement a stateful, quantum-resistant DPoS (Delegated Proof of Stake) consensus algorithm.
Quantum resistance is achieved through the use of Lamport One-Time Signatures combined with Merkle Signature Trees to allow a single public key root hash to be reused multiple times.
The algorithm is stateful; a wallet's public key is changed every 64 transactions; this statefulness provides a number of unique features such as the ability for someone to change their wallet's passphrase.

### 2. Token supply

Capitalisk is a deflationary cryptocurrency. The maximum token supply is 100 million CLSK. Forging delegates only earn CLSK from transaction fees.

### 2. Block time

A new block may be created once every 30 seconds. If a block does not affect the underlying state of the blockchain in any way (contains no transactions or key registrations), it will be 'skipped' and not added to the blockchain. Whenever a block is skipped, it will trigger an event which can be used by third party systems or modules as a deterministic heartbeat.

There are no inflationary block rewards in Capitalisk so there are no incentives for delegates to try to maximize the number of blocks that they forge.

### 2. Instant finality

Capitalisk provides instant block finality with no possibility of rollbacks. This is achieved by requiring that each block be signed by the majority of the top 21 forging delegates before processing can take place.

### 2. Dynamic fees

Capitalisk supports dynamic fees which can be specified as part of the transaction. The minimum fee for each transaction type can be configured on a per-node basis, however, it's important that forging delegates agree on similar minimum fees in order to ensure that they can reach majority consensus over what transactions can be included in each block.
Minimum fees depend on the transaction type. For multisignature transactions, a minimum fee is also levied on a per-member basis to cover additional processing costs.

The default minimum fees are:

[Insert list of fees here]

### 2. Wallet addresses


### 2. Passphrases and signature scheme

An account passphrase is a 12-word mnemonic known only to the account owner.
The passphrase is used to derive a secret seed which can then be used to generate Lamport OTS key pairs on demand to sign transactions.
The signature seeding algorithm has some similarities with that of IOTA but, among several differences, it uses Lamport OTS instead of Winternitz OTS. Lamport OTS supports faster signature creation and verification but at the expense of larger signature size.

Signatures in Capitalisk are around 15KB in size. In order to save storage space, nodes verify the full signature but only store the signature hash - With this approach, it's possible for account holders to cryptographically prove or disprove the validity of any past transaction.

An account's passphrase can be changed by registering new `sig` details by sending a valid `registerSigDetails` transaction signed with the account's current passphrase.

### 2. Stateful signatures

Capitalisk supports a stateful signature scheme based on a variant of Lamport OTS. Lamport OTS was chosen because it is a hash-based signature scheme which is believed to be resistant to quantum computing attacks based on Shor's algorithm. It is also one of the simplest signature schemes to understand and implement and it provides fast signature verification compared to other stateful schemes such as Winternitz OTS. The main downside of Lamport OTS is the large signature size which is typically around 30KB, however, Capitalisk uses a simplified variant of Lamport OTS which was described by Ralph Merkle in 1979 (http://www.merkle.com/papers/Certified1979.pdf); it allows the signature size to be cut approximately by half (to around 15KB). In order to allow public keys to be re-used multiple times, the Merkle Signature Scheme (MSS) is used to authenticate up to 64 Lamport OTS public keys and signatures under a single Merkle root hash. Each transaction includes the current root hash as well as the root hash of the next MSS tree in a sequence; this guarantees that the user cannot run out of OTS keys. All keys for an account can be generated by a client from a single secret seed using an HMAC-256 hashing algorithm to derive new Lamport OTS key pairs as needed.

#### 2. Private keys and public keys

The statefulness of Capitalisk's signature scheme prevents a single wallet address from signing multiple transactions in parallel from different machines. For simple balance transfers, this is generally not a problem, however, there are certain activities such as signing blocks (forging) and signing multisignature transactions which a user may want to perform in parallel from a single account. For this reason, a Capitalisk account can register a separate forgingPublicKey and multisigPublicKey which can be used to sign blocks and transactions in parallel to regular balance transfers. Each of these additional keys can only be used for a specific activity (forging blocks or signing multisig transactions). The user who knows the main secret seed/passphrase can overwrite these public keys at any time with any valid key; this feature could allow a user to let someone else forge blocks and/or sign multisig transactions on their behalf for some limited amount of time without giving that other person the ability to move any funds out of the account - The delegate user who knows the wallet's passphrase can regain full control of those activities at any time by registering new keys to overwrite the keys of the other user.

### 2. Dynamic multisignature wallets

A multisignature (multisig) wallet is an account which requires signatures from multiple other accounts in order to make any transactions.
The maximum number of multisignature members allowed in Capitalisk is 100. A multisignature wallet can be created by sending a transaction of type `registerMultisigWallet` from a regular account. This transaction must specify who the multisig members are for that wallet. To be eligible to become a member of any multisig wallet, an account must first register their `multisig` details by sending a valid `registerMultisigDetails` transaction.

Multisig wallets in Capitalisk can add or remove members over time provided that a sufficient number of existing members agree and sign a new `registerMultisigWallet` transaction with the updated rules and/or members. Multisig wallets in Capitalisk are designed to facilitate the creation and operation of 'Federations'. Federations are intended to be the backbone of the Capitalisk economy. Multisig wallets are a decentralized primitive on top of which custom logic can be implemented using custom modules (instead of smart contracts).

### 2. Custom modules

...

### 2. Transaction expiry

Once a transaction is added to a block and written to the blockchain, any new transaction whose timestamp is older than the last processed transaction for that account will be rejected by the network. This ensures that any old transactions which may not have propagated correctly through the network (for whatever reason; e.g. insufficient fee) will become invalid as soon as a newer transaction is processed.

For security reasons (to avoid reusing Lamport OTS keys), nodes will refuse any transaction which use an older key index than the last one which was recorded on the blockchain.

### 2. Registering as a delegate

In order to forge blocks, an account must first register themselves as a delegate using a `registerForgingDetails` transaction.
They must then compete with other delegates to secure as many votes as possible from Capitalisk token holders.

The top 21 forgers with the highest vote weight (based on the total amount of tokens held by voters) will be able to forge blocks and earn transaction fees.

### 2. Lite nodes

In order to save disk space, a Capitalisk node may be run as a 'lite node'; in this configuration, the node will only store a subset of block signatures (the exact number can be configured). Once it is up to date at the latest block height, a lite node behaves the same as a regular node but it will not seed its data to full nodes for synching purposes.

### 2. Client usage considerations

The stateful nature of Capitalisk's signature scheme means that a key should not be re-used. To avoid this, a client needs to submit a 'next key index' along with each transaction - This allows the client to keep an on-chain record of which keys have already been used. For maximum security, clients should keep track of their own 'next key indexes' on their local host as well. The official JavaScript client provides a way to start signing from any key index. Skipping forward key indexes is allowed but going back is not (except after explicitly registering a new key/new passphrase). Clients auto-increment all key indexes whenever a new transaction is signed. For maximum security, it is strongly recommended to only make regular transactions from a single client machine at a time to avoid key re-use. Note, however, that forging and signing multisig transactions can be done in parallel.

For newly installed clients, there is a mechanism to sync the latest key indexes from the blockchain. This synching mechanism has a built-in verification step to ensure that the next key index corresponds to the last used public key for the current account.

If a key is re-used by accident, the security of the account will be reduced by some factor; in this case, it's important to make a new transaction using a new unused key index to bring the account back to a secure state.

### 2. Scalability



