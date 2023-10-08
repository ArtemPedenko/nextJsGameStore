// @ts-nocheck
import { getI18n } from '../../locales/server';
import getData from '../api/games';
import Fetching from './layout/fetching';
import Carousel from './modules/Carousel';
import Slider from './components/Slider';
import ModuleBreaker from './components/ModuleBreaker';
import { getCurrentLocale } from '../../locales/server';

const Home = async () => {
	const locale = getCurrentLocale();
	const data = await getData(locale); //
	const t = await getI18n();
	const sliderData1 = [];
	const sliderData = [
		{ title: null, offers: [] },
		{ title: null, offers: [] },
	];

	data.map((item: any) => {
		if (item.type === 'group') {
			sliderData1.push(item);
		}
	});

	sliderData1.map((item: any, index: number) => {
		sliderData[index].title = item.title;
		item.offers.map((offer: any, offerIndex: number) => {
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
			<Fetching data={data} />
			<Carousel />
			<Slider data={sliderData[0]} />
			<ModuleBreaker data={data[2]} />
			<Slider data={sliderData[1]} />
		</>
	);
};

export default Home;
