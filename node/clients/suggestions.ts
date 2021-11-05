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
        return this.http.put(URL, DATA, CONFIG)
    }

    public async deleteSuggestion({ accountName, sellerId, sellerSkuId }: any): Promise<any> {

        const URL = `https://api.vtex.com/${accountName}/suggestions/${sellerId}/${sellerSkuId}`;
        const CONFIG = {
            headers: {
                "X-VTEX-API-AppKey": "vtexappkey-exito-NPAJZQ",
                "X-VTEX-API-AppToken": "KXRDLKLVRJIWCAAHAROACAOLDBQIEEHRVFWHIXQLIONPGZYBBWQZQAOJIFAKTDQNCQBXDTZDBCSNMYFEDPGINIAURMYCXGSFXANPYBYIWNXOIAXJZVGEWIATPHFQUWGV"
            }
        };
        return this.http.delete(URL, CONFIG)
    }
}