import { bodyParser } from "@koa/bodyparser";
import Koa from "koa";
import Pug from "koa-pug";
import path from "path";
import { router } from "./webui/routes";

const app = new Koa();

const pug = new Pug({
    viewPath: path.resolve(__dirname, "./webui/views"),
    app: app
});

app.use(bodyParser()).use(router.routes()).use(router.allowedMethods())

app.listen(3333, () => {
    console.log("Note Wallet WebUI is starting at http://localhost:3333")
});