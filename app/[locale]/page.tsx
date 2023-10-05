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
  const sliderData = [];
  data.map((item: any, index: number) => {
    if (item.type === "group") {
      sliderGroup.push(index);
      sliderData.push(item)
    }
  });

  let log = []





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
