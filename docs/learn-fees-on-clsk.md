---
id: learn-fees-on-clsk
title: Fees on Capitalisk
sidebar_label: Fees on Capitalisk
slug: /fees-clsk
---

Capitalisk nodes are decentralized and charge fees per processed transaction. Each type of transaction is subject to a different fee. Fees _can_ be set higher but should be at least:

```
{
  "minTransactionFees": {
    "transfer": "0.1",
    "vote": "0.2",
    "unvote": "0.2",
    "registerSigDetails": "5",
    "registerMultisigDetails": "5",
    "registerForgingDetails": "1",
    "registerMultisigWallet": "0.5"
  },
  "minMultisigRegistrationFeePerMember": "1",
  "minMultisigTransactionFeePerMember": "0.005"
}
```

Any transaction that does not contain enough fees are not being processed. To review fees you can simply run `ldpos fees` in the [`ldpos-commander`](https://github.com/Capitalisk/ldpos-commander).

:::note
Capitalisk supports dynamic fees
:::
