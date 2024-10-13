import Elysia from "elysia";
import { ip } from "elysia-ip";
import addLog from "../helpers/clickhouse"

export const telemetry = ({ methods = ["GET", "PUT", "POST", "DELETE"]} = {}) =>
    new Elysia()
            .use(ip({headersOnly: true}))
            .derive({as: "global"}, () => ({start: Date.now()}))
            .onAfterHandle({as: "global"}, async (ctx) => {
                if(!ctx.route.startsWith("/api")) return
                //@ts-ignore
                await addLog(ctx.route, ctx.params.id, ctx.set.status == "Not Found" ? 404 : ctx.set.status , Date.now() - ctx.start, ctx.ip, "test");
            })
            .onError({as: "global"}, (ctx) => {
                console.log(ctx)
            })
