import type { InstanceOptions, IOContext } from "@vtex/api";
import { AppGraphQLClient } from "@vtex/api";

export default class Search extends AppGraphQLClient {
    constructor(ctx: IOContext, opts?: InstanceOptions) {
        super("vtex.search-resolver@1.x", ctx, opts);
    }

    // getProductById(id: number) {
    //     const { tenant } = this.context;

    //     try {
    //         return this.graphql
    //             .query<any, any>(
    //                 {
    //                     query: `query ProductQuery ($id: !ID) {
    //                 product(identifier: { field: id, value: $id }) {
    //                     productId,
    //                     productName,
    //                     brand
    //             }
    //         }`,
    //                     variables: {
    //                         id
    //                     },
    //                 },
    //                 {
    //                     headers: {
    //                         ...this.options?.headers,
    //                         "Proxy-Authorization": this.context.authToken,
    //                         VtexIdclientAutCookie: this.context.authToken,
    //                         "x-vtex-tenant": tenant || {
    //                             id: "75088eac-4a16-4fc1-9a4c-d0649e47ab91",
    //                             canonicalBaseAddress: "exito.myvtex.com/",
    //                             defaultLocale: "es-CO",
    //                             locale: "es-CO"
    //                         },
    //                         "x-vtex-locale": "es-CO"
    //                     },
    //                 }
    //             )
    //             .then(({ data }: any) => {
    //                 return data;
    //             });

    //     } catch (error) {
    //         console.log("error -->", error)
    //         return false
    //     }

    // }

    getProductBySKU(sku: number) {
        const { tenant } = this.context;

        try {
            return this.graphql
                .query<any, any>(
                    {
                        query: `query ProductQuery ($sku: ID!) {
                            product(identifier: { field: sku, value: $sku }) {
                                productId,
                                productName,
                                brand
                            }
                        }`,
                        variables: {
                            sku
                        },
                    },
                    {
                        headers: {
                            ...this.options?.headers,
                            "Proxy-Authorization": this.context.authToken,
                            VtexIdclientAutCookie: this.context.authToken,
                            "x-vtex-tenant": tenant || {
                                id: "75088eac-4a16-4fc1-9a4c-d0649e47ab91",
                                canonicalBaseAddress: "exito.myvtex.com/",
                                defaultLocale: "es-CO",
                                locale: "es-CO"
                            },
                            "x-vtex-locale": "es-CO"
                        },
                    }
                )
                .then(({ data }: any) => {
                    return data;
                });

        } catch (error) {
            console.log("error -->", error)
            return false
        }

    }

    getProductsByName(name: string) {
        try {
            const { tenant } = this.context;
            console.log(name)
            return this.graphql.query<any, any>({
                query: `query productSearch {
                    products(query: "Iphone 11 Blanco 64Gb") {
                        productId,
                        productName,
                        items {
                            itemId
                            sellers {
                                sellerId,
                                sellerName
                            }
                        }
                      }
                  }`,
                variables: {
                }
            }, {
                headers: {
                    ...this.options?.headers,
                    "Proxy-Authorization": this.context.authToken,
                    VtexIdclientAutCookie: this.context.authToken,
                    "x-vtex-tenant": tenant || {
                        id: "75088eac-4a16-4fc1-9a4c-d0649e47ab91",
                        canonicalBaseAddress: "exitocol.myvtex.com/",
                        defaultLocale: "es-CO",
                        locale: "es-CO"
                    },
                    "x-vtex-locale": "es-CO"
                },
            })
                .then(({ data }: any) => {
                    return data;
                });
        }
        catch (error) {
            return { success: false, data: error }
        }
    }
}