import { json } from 'co-body'

// PARAMS: accountName, payload, sellerId, sellerSkuId, matchId, version
export async function matching(ctx: Context, next: () => Promise<any>) {
    const {
        clients: { matching: matchingClient },
    } = ctx

    const body = await json(ctx.req);

    const bodyKeys = Object.keys(body);
    if (!bodyKeys.length) {
        ctx.status = 400
        ctx.body = {
            message: "Empty Body"
        }
        return await next();
    }

    if (!bodyKeys.includes("accountName") ||
        !bodyKeys.includes("payload") ||
        !bodyKeys.includes("sellerId") ||
        !bodyKeys.includes("sellerSkuId") ||
        !bodyKeys.includes("matchId") ||
        !bodyKeys.includes("version"))
    {
        ctx.status = 400
        ctx.body = {
            message: "Missing some param, the params are accountName, payload, sellerId, sellerSkuId, version, matchId"
        }
        return await next();
    }

    const matchResponse = await matchingClient.doMatch(body)

    console.log("matchResponse", JSON.stringify(matchResponse))

    ctx.status = 200
    ctx.body = matchResponse.data

    await next()
}