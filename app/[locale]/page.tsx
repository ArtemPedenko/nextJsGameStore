// @ts-nocheck
import { getI18n } from '../../locales/server';
import getData from '../utils/gameInfo';
import Fetching from './layout/fetching';
import Carousel from './components/Carousel';
import Slider from './components/Slider';
import ModuleBreaker from './components/ModuleBreaker';
import { getCurrentLocale } from '../../locales/server';
import Logger from './[...product]/logger';

const Home = async () => {
	const locale = getCurrentLocale();
	const data = await getData(locale); //
	const t = await getI18n();
	const sliderData1 = [];
	let moduleBeakerData;
	const sliderData = [
		{ title: null, offers: [] },
		{ title: null, offers: [] },
	];

	data.map((item: {type: string, id: string}) => {
		if (item.type === 'group') {
			sliderData1.push(item);
		}
		if (item.id === 'module-breaker-lists') {
			moduleBeakerData = item;
		}
	});

	sliderData1.map((item: any, index: number) => {
		sliderData[index].title = item.title;
		item.offers?.map((offer: any, offerIndex: number) => {
			let imgUrl = '';

			offer.offer.keyImages.map((imgs: any) => {
				if (imgs.type === 'Thumbnail') {
					imgUrl = imgs.url;
				}
			});

			sliderData[index].offers.push({
				id: offer.id,
				namespace: offer.namespace,
				gameName: offer.offer.title,
				url: offer.offer.catalogNs.mappings[0].pageSlug,
				price: offer.offer.price.totalPrice.fmtPrice.originalPrice,
				imageUrl: imgUrl,
			});
		});
	});

	return (
		<>
		<Logger data={sliderData} />
			{/* add data to Fetching to out it in redux store */}
			<Fetching data={data} />
			<Carousel />
			{sliderData[0].offers.length !== 0 ? <Slider data={sliderData[0]} /> : null}
			<ModuleBreaker data={moduleBeakerData} />
			{sliderData[1].offers.length !== 0 ? <Slider data={sliderData[1]} /> : null}
		</>
	);
};

export default Home;
