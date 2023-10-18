import Slider from "../components/Slider";
import Logger from "../[...product]/logger";
import { getI18n } from "@/locales/server";

const allGamesPage = async ({
  params,
}: {
  params: {
    locale: string;
    product: string[];
  };
}) => {
  const t = await getI18n();

  async function getData(url: string) {
    const response = await fetch(url);
    const responseData = await response.json();
    return responseData;
  }

  const url = `https://egs-platform-service.store.epicgames.com/api/v1/egs/category-cards?count=100&country=RU&locale=${params.locale}&start=0&store=EGS`;
  const genres = await getData(url);

  type Tgenre = {
    id: string | null;
    namespace: string | null;
    gameName: string;
    url: string;
    price: string | null;
    imageUrl: string;
  };

  type TgenresAttay = {
    title: string;
    offers: Tgenre[];
  };

  let genresArray: TgenresAttay = {
    title: params.locale === "ru" ? "Популярные жанры" : "Popular genres",
    offers: [],
  };
  genres.data.map((item: { title: string; slug: string; images: string[] }) => {
    genresArray.offers.push({
      id: null,
      namespace: null,
      gameName: item.title,
      url: item.slug,
      price: null,
      imageUrl: item.images[1],
    });
  });

  return (
    <>
      <Logger data={genres} />
      <Slider data={genresArray} />
    </>
  );
};

export default allGamesPage;
