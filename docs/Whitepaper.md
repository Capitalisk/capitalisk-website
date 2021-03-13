# Capitalisk Whitepaper

## 1. Economics

### 1.1 Overview

Capitalisk (CLSK) is a general purpose token designed to promote the growth and adoption of DEX markets within the Lisk and Leasehold ecosystems and to promote collaboration between different DEX federations. It is intended to serve as a fundraising platform for new tokens to be listed on various DEX markets and also as a blueprint for new kinds of Lisk and Leasehold sidechains. Capitalisk is optimized for maximum compatibility with LDEX https://ldex.trading/ and other federations built with the `lisk-dex` SDK.

Capitalisk was designed from the ground up to have the following characteristics:

- Simple DPoS (Delegated Proof of Stake) consensus with instant block finality.
- Deflationary token supply.
- Signature scheme which is resistant to quantum computing algorithms.
- Signature scheme which is stateful and supports novel features such as changing wallet passphrases.
- Dynamic multisig wallets whose memberships can change over time (e.g. for DEX and other DAO use cases).

### 1.2 How does Capitalisk fit into the Lisk and Leasehold ecosystems?

Capitalisk is intended to be a sidechain of Lisk and can itself be used as a base token for second-level DEX markets (I.e. sub-sidechains).
Capitalisk (CLSK) aims to be connected to Leasehold (LSH) via a DEX market and the technology which powers Capitalisk could potentially be used to power Leasehold in the future (depending on community consensus).

### 1.3 How will CLSK tokens be distributed?

The team behind Capitalisk does not intend to sell any CLSK tokens; instead, all tokens will be airdropped to Leasehold investors and Lisk voters according to the following allocations:

- 50% to Leasehold token holders.
- 30% to Lisk token holders who vote for all 10 members of `Lisk Initiative` on the new Lisk v3 blockchain.
- 10% to Lisk token holders who vote for both `jong` and `savetheworld` delegates on the new Lisk v3 blockchain.
- 10% to Leasehold directors, LDEX members and Capitalisk contributors.

Except for the last 10% allocation, the amount of CLSK distributed to each individual will be proportional to the amount of LSH or LSK tokens in their wallets on certain key dates which will be announced on the https://capitalisk.com website and other community channels at least 30 days beforehand.
Airdrop participants will need to prove their eligibility in order to claim CLSK tokens. It will be possible to qualify under multiple categories.

## 2. Technology

### 2.1 Overview

Capitalisk is the first token built on top of LDPoS; a set of modules which implement a stateful, quantum-resistant DPoS (Delegated Proof of Stake) consensus algorithm.
Quantum resistance is achieved through the use of Lamport One-Time Signatures combined with Merkle Signature Trees to allow a single public key root hash to be reused multiple times.
The algorithm is stateful; a wallet's public key is changed every 64 transactions; this statefulness provides some novel features including the ability for a user to change their wallet's passphrase.

### 2.2 Custom modules

Capitalisk is implemented as a custom module which runs on top of LDEM https://github.com/jondubois/ldem.
LDEM is a multi-process engine designed to run custom modules across multiple CPU cores for maximum scalability.
It spawns modules automatically by reading a `config.json` file which contains the definitions and configurations for each module.

### 2.3 Custom module templating

Capitalisk offers a novel feature called `Custom Module Templating` - This allows the source code of any single module to be used to spawn multiple different instances which can run alongside each other in parallel on different CPU cores (without slowing each other down).

Each custom module config should specify a `modulePath` which tells LDEM which source code to use as the template/blueprint for a custom module instance.
This allows node operators to easily spawn new blockchains by re-using existing source code with different configurations.
For example, a group of node operators could launch a completely new blockchain in a few minutes on their existing nodes by adding a new config object to their `config.json` file.

This approach of creating new blockchains can also be used for creating new DEX markets (I.e. to immediately support trading for those newly created blockchains).

LDEM ensures that nodes which have matching modules will automatically find each other over the Lisk network and form a subnet with each other.

### 2.4 Scalability

The Capitalisk ecosystem can scale linearly without limit via a multi-chain 'sidechain' architecture. Any blockchain which is directly or indirectly connected to CLSK via a DEX market can be traded against CLSK in a decentralized way. Cross-chain trades made via the DEX leave behind a complete and immutable on-chain history which can be used to trustlessly determine the price and daily volume between any two connected blockchains at any point in history. This feature, combined with `Custom Module Templating` can allow front end applications to interact with different blockchains via the same set of APIs. The purpose of this is to encourage third-party applications to accept different tokens interchangeably (and possibly adjusting the price up or down based on market volumes).

We believe that the approach of accepting many different tokens interchangeably will become a profitable strategy for merchants in the future as low volume tokens could potentially be accepted at a steep discount and also incur lower transaction fees. It could create a highly competitive landscape for third-party entities to correctly assess the trustworthiness and reliability of low-volume tokens.

### 2.5 Token supply

Capitalisk is a deflationary cryptocurrency. The maximum token supply is 100 million CLSK. Forging delegates only earn CLSK from transaction fees.

### 2.6 Block time

A new block may be created once every 30 seconds. If a block does not affect the underlying state of the blockchain in any way (contains no transactions or state changes), it will be 'skipped' and will not be added to the blockchain. This was done to save on storage space and reduce sync time for new nodes.

### 2.7 Instant finality

Capitalisk provides instant block finality with no possibility of rollbacks. This is achieved by requiring that each block be signed by the majority of the top 21 forging delegates before they are processed. Block signing involves a single-phase voting algorithm which provides a time window for delegates to propagate their block signatures throughout the network. The voting time window does not slow down nodes in any way since they can still receive, validate and propagate transactions to be included within the next block in parallel.

### 2.8 Dynamic fees

Capitalisk supports dynamic fees which can be specified as part of the transaction. The minimum fee for each transaction type can be configured on a per-node basis, however, it's important that forging delegates agree on similar minimum fees in order to ensure that they can reach majority consensus over what transactions can be included in each block.
Minimum fees depend on the transaction type. For multisignature transactions, a minimum fee is also levied on a per-member basis to cover additional processing costs.

### 2.9 Wallet addresses

Wallet addresses start with the token symbol `clsk` followed by 40 hexadecimal characters (e.g. `clsk57c12965bf0b92aa4eab8b8e87aa9f3a2dac21d8`).
The address system was optimized for a combination of security, readability and implementation simplicity.
An address can be derived from a passphrase in a deterministic way.

### 2.10 Passphrases and signature scheme

An account passphrase is a 12-word mnemonic known only to the account owner (e.g. `cycle oak invest problem desk casual include rival carpet option engage entire`).
The passphrase is used to derive a secret seed which can then be used to generate Lamport OTS key pairs on demand to sign transactions.
The signature seeding algorithm has some similarities with that of IOTA but, among several key differences, it uses Lamport OTS instead of Winternitz OTS. Lamport OTS supports faster signature creation and verification but at the expense of a larger signature size.

Signatures in Capitalisk are around 15KB in size. In order to save storage space, nodes verify the full signature but only store the signature hash - With this approach, it's still possible for any account holders to cryptographically prove or disprove the validity of any past transaction.

An account's passphrase can be changed at will by sending a valid `registerSigDetails` transaction signed using the account's current passphrase.

### 2.11 Stateful signatures

Capitalisk supports a stateful signature scheme based on a variant of Lamport OTS. Lamport OTS was chosen because it is a hash-based signature scheme which is believed to be resistant to quantum computing attacks based on Shor's algorithm. It is also one of the simplest signature schemes to understand and implement and it provides fast signature verification compared to other stateful schemes such as Winternitz OTS. The main downside of Lamport OTS is the large signature size which is typically around 30KB, however, Capitalisk uses a simplified variant of Lamport OTS which was described by Ralph Merkle in 1979 (http://www.merkle.com/papers/Certified1979.pdf); it allows the signature size to be cut approximately by half (to around 15KB). In order to allow public keys to be re-used multiple times, the Merkle Signature Scheme (MSS) is used to authenticate up to 64 Lamport OTS public keys and signatures under a single Merkle root hash. Each transaction includes the current root hash as well as the root hash of the next MSS tree in a sequence; this guarantees that the user can never run out of OTS keys. All keys for an account can be generated by a client from a secret seed using an HMAC-256 hashing algorithm to derive new Lamport OTS key pairs as needed.

#### 2.12 Private keys and public keys

The statefulness of Capitalisk's signature scheme prevents a single wallet address from signing multiple transactions in parallel from different machines. For simple balance transfers, this feature is typically not required anyway, however, there are certain activities such as signing blocks (forging) and signing multisignature transactions which a user may want to perform in parallel from a single account. For this reason, a Capitalisk account can register a separate forgingPublicKey and multisigPublicKey which can be used to sign blocks and multisignature transactions in parallel. Each of these additional keys can only be used for a specific activity (forging blocks or signing multisig transactions). The user who knows the main secret seed/passphrase can overwrite these public keys at any time; this feature could allow a user to let someone else forge blocks and/or sign multisig transactions on their behalf for some limited amount of time without giving that other person the ability to move any funds out of their account - The user who knows the wallet's passphrase can regain full control of those activities at any time by registering new keys to overwrite the keys of the other user.

### 2.13 Dynamic multisignature wallets

A multisignature (multisig) wallet is an account which requires signatures from multiple other accounts in order to make any transactions.
The maximum number of multisignature members allowed in Capitalisk is 100. A multisignature wallet can be created by sending a transaction of type `registerMultisigWallet` from a regular account. This transaction must specify who the multisig members are for that wallet. To be eligible to become a member of any multisig wallet, an account must first register their `multisig` details by sending a valid `registerMultisigDetails` transaction.

Multisig wallets in Capitalisk can add or remove members over time provided that a sufficient number of existing members agree and sign a new `registerMultisigWallet` transaction with the updated rules and/or members. Multisig wallets in Capitalisk are designed to facilitate the creation and operation of 'Federations'. Federations are intended to be the backbone of the Capitalisk economy. Multisig wallets can be used as a decentralized primitive on top of which custom logic can be implemented using custom modules.

### 2.14 Network topology

Capitalisk is based on `lisk-p2p` and so its network partially overlaps with that of Lisk, Leasehold and potentially other Lisk-based blockchain built with `lisk-p2p`.
This is made possible by the fact that nodes built on top of `LDEM` can run multiple blockchains at the same time. See section 2.3 for more info about custom modules and LDEM.

Nodes in the Lisk network form a sparse but fully-connected graph within which each node has a limited partial view of the network. This ensures that the network can scale indefinitely relative to the total number of nodes. The network topology is unstructured (non-deterministic) and involves frequent peer shuffling - This makes it essentially impossible to analyze the network topology, particularly as the network gets bigger over time.

### 2.15 P2P module-to-module routing

`lisk-p2p` allows custom modules running on any node to communicate with other modules running on different nodes in the network using a simple URL-like routing scheme.
This allows modules to form independent subnets with each other to share data and reach consensus among themselves without congesting the rest of the network.
This subnet feature is particularly useful for sidechains, DEX federations and other kinds of dapps.

### 2.16 Transaction propagation and pending queue

Transactions are signed on the client-side. A signed transaction can then be broadcast to the network by sending it to any node in the network. If the transaction is valid, the transaction will propagate through the entire Capitalisk subnet. Transactions will be queued and ordered based on the specified fee.
If an account sends multiple transactions within a short period of time, they will be bundled together in the pending queue to ensure that they are processed together - An account can therefore bump up the priority of an earlier pending transaction by submitting a second transaction with a higher fee.

### 2.17 Invalidating all unprocessed transactions

All previously signed but not yet submitted transactions from an account can easily be invalidated by shifting the account's `sigKeyIndex` forward by 128 via a `registerSigDetails` transaction. This ensures that these signed transactions cannot be broadcast to the network at a later date. Changing passphrases will also invalidate all previous unprocessed transactions.

### 2.18 Registering as a delegate

In order to forge blocks, an account must first register themselves as a delegate using a `registerForgingDetails` transaction.
They must then compete with other delegates to secure as many votes as possible from CLSK token holders.

The top 21 forgers with the highest vote weight (based on the total amount of tokens held by voters) will be able to forge blocks and earn transaction fees.

### 2.19 Lite nodes

In order to save disk space, a Capitalisk node may be run as a 'lite node'; in this configuration, the node will only store a subset of block signatures (the exact number can be configured). Once it is up to date at the latest block height, a lite node behaves the same as a regular node but it will not seed its data to full nodes for syncing purposes.

### 2.20 Client usage considerations

The stateful nature of Capitalisk's signature scheme means that a key should not be re-used. To avoid this, a client needs to submit a 'next key index' along with each transaction - This allows the client to keep an on-chain record of which OTS key they should use next. For maximum security, clients must keep track of their own 'next key indexes' on their local host as well. The official JavaScript client provides a way to start signing from any key index. Skipping forward key indexes is allowed but going back is not (except after explicitly registering a new key/new passphrase). Clients auto-increment all key indexes whenever a new transaction is signed. For maximum security, it is strongly recommended to only make transactions from a single client machine at a time (per wallet address) in order to avoid key re-use. Note, however, that forging and signing multisig transactions can be done in parallel.

When launching a client for the first time on a new machine, there is a mechanism to automatically sync the latest key indexes from the blockchain. This syncing mechanism has a built-in verification step to ensure that the next key index corresponds to the last used public key for the current account.

If a key is re-used by accident, the security of the account will be reduced by some factor; in this case, it's important to make a new transaction using a new unused key index to bring the account back to a secure state.
