import { getI18n } from "../../locales/server";
import Header from "./modules/Header";
import { FC } from "react";
import getData from "../api/games";
import Fetching from "./layout/fetching";
import Carousel from "./modules/Carousel";
import Slider from "./components/Slider";
import ModuleBreaker from "./components/ModuleBreaker";
import { getCurrentLocale } from "../../locales/server";

const Home = async () => {
  const locale = getCurrentLocale();
  const data = await getData(locale);
  console.log(data);
  const t = await getI18n();
  return (
    <div>
      <Fetching data={data} />
      <Carousel />
      <Slider data={data[1]} />
      <ModuleBreaker data={data[2]} />
      <Slider data={data[4]} />
    </div>
  );
};

export default Home;
//
