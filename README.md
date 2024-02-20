# NOTE Wallet (Community Version)

The wallet is a simple CLI tool to manage Bitcoin and NOTE crypto assets.


## Installation
install nodejs and npm or yarn or pnpm, first.

then install the dependencies.

```
pnpm i
```

## Setup

rename `.env.example` to `.env`, and fill in the required information.

Setup your wallet WALLET_MNEMONIC in `.env`, if you keep empty, the tool will generate a new one. backup your mnemonic, it's your only chance to recover your wallet.

## Start
```
pnpm run start
```

## Show Balance
```
balance
```

Charge some satoshis to `mainAddress`, then check the balance of `mainAddress` with 'balance' command.

## Show Token List and Balance
```
tokenlist
```

## Mint NOTE Token
```
mintnote
```

## sendtoken to tokenAddress of others
```
sendtoken [token address] [tick] [amount]
```

an example
```
sendtoken bc1p6ule9mj6u9tqzuq5zk9kn3sqlg788kzkpj63ff6j8jm26mvy8evsmqhz4n NOTE 1000000
```


