import { json } from 'co-body'

const similitudeProducts = ({ mainProduct, product }: any) => {
  if (mainProduct.product.productName === product.productName) {
    return 100
  }

  let percentage = 100
  const productNameAsArray = product.productName.split(" ");
  productNameAsArray.forEach((word: any) => {
    if (!mainProduct.product.productName.includes(word)) {
      percentage = percentage - (100 / productNameAsArray.length)
    }
  })
  return percentage;
}


export async function matching(ctx: Context, next: () => Promise<any>) {

  const {
    clients: { masterdata, search }
  } = ctx

  const body = await json(ctx.req)
  const { IdSku } = body;

  const documents = await masterdata.searchDocuments({
    dataEntity: "PR",
    where: `main_sku=${IdSku}`,
    fields: [
      "percentage"
    ],
    pagination: {
      page: 1,
      pageSize: 10
    },
    schema: "v1"
  })

  if (documents) {
    ctx.status = 400
    ctx.body = {
      success: false,
      message: "This sku has been analyzed before.",
      data: null
    }
    await next()
    return {
      success: false,
      message: "This sku has been analyzed before.",
      data: null
    }
  }

  const mainProduct = await search.getProductBySKU(IdSku);
  const similarProducts = await search.getProductsByName(mainProduct.product.productName);

  let percentage = 0;

  similarProducts.products.forEach(async (product: any) => {

    percentage = Math.ceil(similitudeProducts({ mainProduct, product }))
    product.percentage = percentage;

    //   await masterdata.createDocument({
    //     dataEntity: "PR",
    //     fields: {
    //       main_sku: IdSku,
    //       main_name: mainProduct.product.productName,
    //       similar_sku: product.items[0].itemId,
    //       similar_name: product.productName,
    //       percentage
    //     },
    //     schema: "v1"
    //   })
  })


  ctx.status = 200
  ctx.body = {
    success: true,
    message: "Return main products & similar products",
    data: {
      mainProduct,
      similarProducts
    }
  }

  await next()
  return {
    success: true,
    message: "Return main products & similar products",
    data: {
      mainProduct,
      similarProducts
    }
  }
}