const allGamesPage = async ({ params }) => {
  async function getData(url: string) {
    const response = await fetch(url);
    const responseData = await response.json();
    return responseData;
  }

  const url = `https://egs-platform-service.store.epicgames.com/api/v1/egs/category-cards?count=100&country=RU&locale=${params.locale}&start=0&store=EGS`;
  const genres = await getData(url);
  console.log(genres.offerDataObj);
  return (
    <>
      <div>
        {genres.data.map((item, index) => {
          return <div key={index}>{item.images[0]}</div>;
        })}
      </div>
    </>
  );
};

export default allGamesPage;
