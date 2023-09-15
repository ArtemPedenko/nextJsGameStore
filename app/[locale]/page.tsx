import { getI18n } from '../../locales/server';
import Header from "./modules/Header";
import { FC } from "react";
import getData from '../api/games';
import Fetching from './layout/fetching';


interface epicProps {
  epic: any;
}


const Home: FC<epicProps> = async () => {
  const data = await getData();
  const t = await getI18n()
  return (
    <section>
      <Fetching data={data} />
      <p>{t('store')}</p>


      this start page?
    </section>
  )
}

export default Home;