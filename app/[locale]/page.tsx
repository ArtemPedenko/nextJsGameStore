import { getI18n } from "../../locales/server";
import Header from "./modules/Header";
import { FC } from "react";
import getData from "../api/games";
import Fetching from "./layout/fetching";
import Carousel from "./modules/Carousel";
import Slider from "./components/Slider";
import ModuleBreaker from "./components/ModuleBreaker";
import { getCurrentLocale } from "../../locales/server";
import Link from "next/link";

const Home = async () => {
  const locale = getCurrentLocale();
  const data = await getData(locale);
  const t = await getI18n();
  let sliderGroup = [];
  const sliderData1 = [];
  const sliderData = [
    { title: null, offers: [] },
    { title: null, offers: [] },
  ];

  data.map((item: any, index: number) => {
    if (item.type === "group") {
      sliderGroup.push(index);
      sliderData1.push(item);
    }
  });

  let log = [];

  sliderData1.map((item: any, index: number) => {
    //sliderData[index] = {
    //  title: item.title,
    //  offers: item.offers,
    //};
    item.offers.map((offer: any, offerIndex: number) => {
      let imgUrl = "";

      offer.offer.keyImages.map((imgs: any) => {
        if (imgs.type === "Thumbnail") {
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
    <div>
      <Fetching data={data} />
      <Carousel />
      <Slider data={sliderData} sliderGroup={sliderGroup[0]} />
      <ModuleBreaker data={data[2]} />
      <Slider data={log} sliderGroup={sliderGroup[1]} />
    </div>
  );
};

export default Home;
//
