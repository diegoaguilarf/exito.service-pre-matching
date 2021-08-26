import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class Suggestion extends ExternalClient {
    constructor(context: IOContext, options?: InstanceOptions) {
        super('', context, options)
    }

    public async createSuggestion({ accountName, payload, sellerId, sellerSku }: any): Promise<any> {

        const URL = `https://api.vtex.com/${accountName}/suggestions/${sellerId}/${sellerSku}`;
        const DATA = payload;
        const CONFIG = {
            headers: {
                "X-VTEX-API-AppKey": "vtexappkey-exito-NPAJZQ",
                "X-VTEX-API-AppToken": "KXRDLKLVRJIWCAAHAROACAOLDBQIEEHRVFWHIXQLIONPGZYBBWQZQAOJIFAKTDQNCQBXDTZDBCSNMYFEDPGINIAURMYCXGSFXANPYBYIWNXOIAXJZVGEWIATPHFQUWGV"
            }
        };
        console.log(URL, JSON.stringify(DATA));
        return this.http.put(URL, DATA, CONFIG)
    }
}