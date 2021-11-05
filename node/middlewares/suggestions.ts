import { json } from 'co-body'

// PARAMS: accountName, payload, sellerId, sellerSku
export async function suggestions(ctx: Context, next: () => Promise<any>) {
    const {
        clients: { suggestions: suggestionsClient },
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
        !bodyKeys.includes("sellerSku"))
    {
        ctx.status = 400
        ctx.body = {
            message: "Missing some param, the params are accountName, payload, sellerId, sellerSku"
        }
        return await next();
    }

    const suggestionResponse = await suggestionsClient.createSuggestion(body)
    console.log(suggestionResponse.headers, suggestionResponse.status)

    ctx.status = 200
    ctx.body = { success: true, data: suggestionResponse.data }

    await next()
}


export async function  deleteSuggestion(ctx: Context, next: () => Promise<any>) {
    const {
        clients: { suggestions: suggestionsClient },
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
        !bodyKeys.includes("sellerId") ||
        !bodyKeys.includes("sellerSkuId"))
    {
        ctx.status = 400
        ctx.body = {
            message: "Missing some param, the params are accountName, sellerId, sellerSkuId"
        }
        return await next();
    }
    
    const suggestionResponse = await suggestionsClient.deleteSuggestion(body)

    ctx.status = 200
    ctx.body = { success: true, data: suggestionResponse.data }

    await next()
}