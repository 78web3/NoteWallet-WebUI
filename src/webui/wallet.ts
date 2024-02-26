
import { BTCWallet } from "../btc/btc-wallet";
import { coins, WALLET_MNEMONIC } from "../config";
import type { Wallet } from "../wallet";

export class CommandLineWallet {
    private wallets: Record<string, Wallet> = {};
    private currentWallet: Wallet | undefined;

    constructor() {
        this.init(WALLET_MNEMONIC!);
    }

    getCurrAddress() {
        return {
            main: this.currentWallet?.info().mainAddress,
            token: this.currentWallet?.info().tokenAddress,
            memo: this.currentWallet?.info().mnemoic
        }
    }

    getBalance() {
        return Promise.all([this.currentWallet?.getBalance(), this.currentWallet?.tokenList()])
    }

    sendNote(addr: string, amt: bigint) {
        return this.currentWallet?.sendToken(addr, "NOTE", amt)
    }

    init(mnemonic: string) {
        for (const coin of coins) {
            switch (coin.symbol) {
                case "BTC":
                    if (coin.network === "livenet") {
                        this.wallets.BTClivenet = new BTCWallet(mnemonic, coin);
                        this.currentWallet = this.wallets.BTClivenet
                    }
                    break;
            }
        }
    }

}


export const currWallet = new CommandLineWallet();
