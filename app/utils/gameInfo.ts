async function getData(locale: string) {
	const url = `https://store.epicgames.com/graphql?operationName=fetchStorefrontPaginated&variables=%7B%22locale%22:%22${locale}%22,%22country%22:%22RU%22,%22start%22:0,%22count%22:6%7D&extensions=%7B%22persistedQuery%22:%7B%22version%22:1,%22sha256Hash%22:%225d0618f4ae891298c5bb1db13bb8ab40c35fb8ae8cbff508cafae2000669eb92%22%7D%7D`;
	const response = await fetch(url)
		.then((response) => response.json())
		.then((data) => {
			return data.data.Storefront.storefrontModulesPaginated.modules;
		})
		.catch((error) => console.error(error));
	return response;
}

export default getData;
