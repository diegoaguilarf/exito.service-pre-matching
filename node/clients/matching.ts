import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class Matching extends ExternalClient {
    constructor(context: IOContext, options?: InstanceOptions) {
        super('', context, options)
    }

    public async doMatch({ accountName, payload, sellerId, sellerSkuId, matchId, version }: any): Promise<any> {

        const URL = `https://api.vtex.com/${accountName}/suggestions/${sellerId}/${sellerSkuId}/versions/${version}/matches/${matchId}`;
        const DATA = payload;
        const CONFIG = {
            headers: {
                "X-VTEX-API-AppKey": "vtexappkey-exito-NPAJZQ",
                "X-VTEX-API-AppToken": "KXRDLKLVRJIWCAAHAROACAOLDBQIEEHRVFWHIXQLIONPGZYBBWQZQAOJIFAKTDQNCQBXDTZDBCSNMYFEDPGINIAURMYCXGSFXANPYBYIWNXOIAXJZVGEWIATPHFQUWGV"
            }
        };
        return this.http.put(URL, DATA, CONFIG)
    }
}