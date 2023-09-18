import { getI18n } from "../../locales/server";
import Header from "./modules/Header";
import { FC } from "react";
import getData from "../api/games";
import Fetching from "./layout/fetching";
import Carousel from "./modules/Carousel";
import Slider from "./components/Slider";

interface epicProps {
  epic: any;
}

const Home: FC<epicProps> = async () => {
  const data = await getData();
  const t = await getI18n();
  return (
    <div>
      <Fetching data={data} />
      <Carousel />
      <Slider
        data={data.data.Storefront.storefrontModulesPaginated.modules[1]}
      />
    </div>
  );
};

export default Home;
//
