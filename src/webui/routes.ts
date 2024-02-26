import { copyFileSync, existsSync, readFile, writeFile, writeFileSync } from "fs";
import Router from "koa-router";
import { exit } from "process";
import { WALLET_MNEMONIC } from "../config";
import { currWallet } from "./wallet";

let initialized = false;
export const router = new Router();


const addr = currWallet.getCurrAddress();
if (WALLET_MNEMONIC) {
    initialized = true
} else {
    readFile(".env", 'utf8', (err, data) => {
        if (!existsSync(".env")) {
            console.log("copy .env from .env.sample")
            copyFileSync(".env.example", ".env")
            writeFileSync(".trigger", `${new Date()}`)
            exit(0)
        }
        if (err) {
            return console.log(err);
        }

        // 将文件内容转换为行
        let lines = data.split('\n');

        // 更新变量值的例子
        let updatedLines = lines.map(line => {
            if (line.startsWith('WALLET_MNEMONIC=')) {
                return `WALLET_MNEMONIC="${addr.memo}"`; // 替换为新的值
            }
            return line;
        });

        // 将更新后的内容转换回字符串
        let updatedData = updatedLines.join('\n');

        // 写回 .env 文件
        writeFile(".env", updatedData, 'utf8', (err) => {
            if (err) return console.log(err);
            console.log('.env file has been updated');
        });
    })
}

router.get("/", async (ctx) => {
    await ctx.render('index', {
    })
})



router.get("/balance", async (ctx, next) => {
    const [mainAddr, tokenList] = await currWallet.getBalance();
    const { mainAddress } = mainAddr!;
    const tokenAddress = tokenList![0];
    tokenAddress!.confirmed /= BigInt(100000000.0);
    tokenAddress!.unconfirmed /= BigInt(100000000.0);

    await ctx.render('balance', {
        token: tokenAddress,
        main: mainAddress
    })
})

router.post("/send", async (ctx, next) => {
    const { receive, amount } = ctx.request.body
    let msg = `向 ${receive} 转账 ${amount} NOTE 成功。`;
    if (!receive.startsWith("bc1p")) {
        msg = `${receive} 接收地址错误`
    }
    if (!BigInt(amount)) {
        msg = `${amount} 数量填写错误`
    }
    await currWallet.sendNote(receive, BigInt(amount))

    await ctx.render('send-result', { msg: msg })
})

router.get("/send", async (ctx, next) => {
    await ctx.render('send')
});

router.get("/init", async (ctx, next) => {
    await ctx.render('init', {
        existed: initialized,
        memo: !initialized ? addr.memo : '',
        main: addr.main,
        token: addr.token
    })
    initialized = true;
});