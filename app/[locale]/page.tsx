import { getI18n } from '../../locales/server';
import Header from "./modules/Header";
import { FC } from "react";
import getData from '../api/games';
import Fetching from './layout/fetching';
import Carousel from './modules/Carousel';


interface epicProps {
  epic: any;
}


const Home: FC<epicProps> = async () => {
  const data = await getData();
  const t = await getI18n()
  return (
    <div>
      <Fetching data={data} />
      <Carousel />
    </div>
  )
}

export default Home;