async function getData(locale: string) {
	const url = `https://store-site-backend-static-ipv4.ak.epicgames.com/storefrontLayout?locale=${locale}&country=RU&start=0&count=6`
	const response = await fetch(url)
		.then((response) => response.json())
		.then((data) => {
			
			return data.data.Storefront.storefrontModulesPaginated.modules;
		})
		.catch((error) => console.error(error));
	return response;
}

export default getData;
