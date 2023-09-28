async function getData(locale: string) {
  const url = `https://store.epicgames.com/graphql?operationName=fetchStorefrontPaginated&variables=%7B%22locale%22:%22${locale}%22,%22country%22:%22RU%22,%22start%22:0,%22count%22:6%7D&extensions=%7B%22persistedQuery%22:%7B%22version%22:1,%22sha256Hash%22:%225d0618f4ae891298c5bb1db13bb8ab40c35fb8ae8cbff508cafae2000669eb92%22%7D%7D`;
  const response = await fetch(url);
  const responseData = await response.json();
  const data = responseData.data.Storefront.storefrontModulesPaginated.modules;

  return data;
}

export default getData;


//https://store.epicgames.com/graphql?operationName=getCatalogOffer&variables=%7B%22locale%22:%22ru%22,%22country%22:%22RU%22,%22offerId%22:%22////c7372a04d62b4d4bb5b2a95424202e25////%22,%22sandboxId%22:%22////94cec4802e954a6c9579e29e8b817f3a////%22%7D&extensions=%7B%22persistedQuery%22:%7B%22version%22:1,%22sha256Hash%22:%22c4ad546ad2757b60ff13ace19ffaf134abb23cb663244de34771a0444abfdf33%22%7D%7D
//https://store.epicgames.com/graphql?operationName=getCatalogOffer&variables=%7B%22locale%22:%22ru%22,%22country%22:%22RU%22,%22offerId%22:%22////7253c0996c2345c39bc839dcd572af6e////%22,%22sandboxId%22:%22////0a9e3c5ab6684506bd624a849ca0cf39////%22%7D&extensions=%7B%22persistedQuery%22:%7B%22version%22:1,%22sha256Hash%22:%22c4ad546ad2757b60ff13ace19ffaf134abb23cb663244de34771a0444abfdf33%22%7D%7D