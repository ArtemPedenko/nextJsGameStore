// @ts-nocheck
import ProductSlider from '../components/ProductSlider';
import StickyGameInfo from '../modules/StickyGameInfo';
import Logger from './logger';
//import { getI18n } from "@/locales/server";
import { getI18n } from '@/locales/server';
//
const ProductPage = async ({ searchParams, params }) => {
	const t = await getI18n();

	async function getData(url: string) {
		const response = await fetch(url);
		const responseData = await response.json();
		return responseData;
	}

	const url = `https://store.epicgames.com/graphql?operationName=getStoreConfig&variables=%7B%22locale%22:%22${params.locale}%22,%22sandboxId%22:%22${searchParams.namespace}%22%7D&extensions=%7B%22persistedQuery%22:%7B%22version%22:1,%22sha256Hash%22:%220247771a057e44ee16627574296ad79fd48e41b4cb056465515a54ade05aa7f2%22%7D%7D`;
	const productImagesUrl = `https://store.epicgames.com/graphql?operationName=getProductHomeConfig&variables=%7B%22locale%22:%22${params.locale}%22,%22sandboxId%22:%22${searchParams.namespace}%22%7D&extensions=%7B%22persistedQuery%22:%7B%22version%22:1,%22sha256Hash%22:%225a922bd3e5c84b60a4f443a019ef640b05cb0ae379beb4aca4515bf9812dfcb4%22%7D%7D`;
	const productImagesUrlAnother = `https://store-content-ipv4.ak.epicgames.com/api/${params.locale}/content/products/${params.product[1]}`;
	const offerUrl = `https://store.epicgames.com/graphql?operationName=getCatalogOffer&variables=%7B%22locale%22:%22${params.locale}%22,%22country%22:%22RU%22,%22offerId%22:%22${searchParams.id}%22,%22sandboxId%22:%22${searchParams.namespace}%22%7D&extensions=%7B%22persistedQuery%22:%7B%22version%22:1,%22sha256Hash%22:%22c4ad546ad2757b60ff13ace19ffaf134abb23cb663244de34771a0444abfdf33%22%7D%7D`;

	const search =
		'https://store.epicgames.com/graphql?operationName=primarySearchAutocomplete&variables=%7B%22allowCountries%22:%22RU%22,%22category%22:%22games%2Fedition%2Fbase%7Cbundles%2Fgames%7Ceditors%7Csoftware%2Fedition%2Fbase%7Caddons%2Flaunchable%22,%22count%22:4,%22country%22:%22RU%22,%22keywords%22:%22assa%22,%22locale%22:%22ru%22,%22sortBy%22:null,%22sortDir%22:%22DESC%22%7D&extensions=%7B%22persistedQuery%22:%7B%22version%22:1,%22sha256Hash%22:%22531ca97218358754b2a3dade40dbbfc62e280d0173dcaf53305b3b3f3c393580%22%7D%7D';
	const serchData = await getData(search);

	const data = await getData(url);
	let productImageData = await getData(productImagesUrl);
	let imageArray = [];
	const offerData = await getData(offerUrl);
	let offerDataObj = {
		description: offerData.data.Catalog.catalogOffer.description,
		offerType: offerData.data.Catalog.catalogOffer.offerType,
		price:
			offerData.data.Catalog.catalogOffer.price.totalPrice.fmtPrice
				.originalPrice,
		title: offerData.data.Catalog.catalogOffer.title,
		developer: offerData.data.Catalog.catalogOffer.developerDisplayName,
	};

	if (productImageData.data.Product.sandbox.configuration[1] === undefined) {
		productImageData = await getData(productImagesUrlAnother);
		if (productImageData.pages === undefined) {
			offerData.data.Catalog.catalogOffer.keyImages.map((item: any) => {
				if (item.type === 'featuredMedia') {
					imageArray.push(item.url);
				}
			});
		} else {
			imageArray = productImageData.pages[0]._images_;
		}
	} else if (productImageData.data.Product.sandbox.configuration[1]) {
		productImageData.data.Product.sandbox.configuration[1].configs.keyImages.map(
			(item) => {
				if (item.type === 'featuredMedia') {
					imageArray.push(item.url);
				}
			}
		);
	}

	/*  return (
    <>
      <Logger
        data={data}
        offerData={offerData}
        productImageData={productImageData}
      />
      <ProductSlider data={imageArray} />
    </>
  ); */

	return (
		<>
			<Logger data={serchData} />

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
					<ProductSlider data={imageArray} />
					{offerDataObj.description} <br />
					{t(`developer`)} : {offerDataObj.developer}
				</div>
				<StickyGameInfo data={data.data} offerData={offerDataObj} />
			</div>
		</>
	);
};

export default ProductPage;
