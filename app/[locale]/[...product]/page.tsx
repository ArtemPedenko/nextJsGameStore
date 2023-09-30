import ProductSlider from '../components/ProductSlider';
import StickyGameInfo from '../modules/StickyGameInfo';
import Logger from './logger';
//
const ProductPage = async ({ searchParams, params }) => {
	console.log(searchParams);
	console.log(params);

	async function getData(url: string) {
		const response = await fetch(url);
		const responseData = await response.json();
		return responseData.data;
	}

	const url = `https://store.epicgames.com/graphql?operationName=getStoreConfig&variables=%7B%22locale%22:%22${params.locale}%22,%22sandboxId%22:%22${searchParams.namespace}%22%7D&extensions=%7B%22persistedQuery%22:%7B%22version%22:1,%22sha256Hash%22:%220247771a057e44ee16627574296ad79fd48e41b4cb056465515a54ade05aa7f2%22%7D%7D`;
	const productImagesUrl = `https://store.epicgames.com/graphql?operationName=getProductHomeConfig&variables=%7B%22locale%22:%22${params.locale}%22,%22sandboxId%22:%22${searchParams.namespace}%22%7D&extensions=%7B%22persistedQuery%22:%7B%22version%22:1,%22sha256Hash%22:%225a922bd3e5c84b60a4f443a019ef640b05cb0ae379beb4aca4515bf9812dfcb4%22%7D%7D`;
	const offerUrl = `https://store.epicgames.com/graphql?operationName=getCatalogOffer&variables=%7B%22locale%22:%22${params.locale}%22,%22country%22:%22RU%22,%22offerId%22:%22${searchParams.id}%22,%22sandboxId%22:%22${searchParams.namespace}%22%7D&extensions=%7B%22persistedQuery%22:%7B%22version%22:1,%22sha256Hash%22:%22c4ad546ad2757b60ff13ace19ffaf134abb23cb663244de34771a0444abfdf33%22%7D%7D`;

	const data = await getData(url);
	const productImageData = await getData(productImagesUrl);
	const offerData = await getData(offerUrl);

	return (
		<>
			<Logger
				data={data}
				offerData={offerData}
				productImageData={productImageData}
			/>
			<ProductSlider data={productImageData} />
		</>
	);

	/* if (data) {
		return (
			<div>
				id {params.product[1]} <br />
				namespace {params.product[2]}
				<h1>{data?.data.about.title}</h1>
				<div
					style={{
						width: '1600px',
						margin: '0 auto',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<div style={{ width: '1200px' }}>
						<ProductSlider data={data?.data} />
					</div>
					<StickyGameInfo data={data.data} offerData={offerData} />
				</div>
			</div>
		);
	} else {
		return (
			<>
				<div>Полномочия - всё</div>
				<Logger data={offerData} dataLog={data} />
			</>
		);
	} */
};

export default ProductPage;
