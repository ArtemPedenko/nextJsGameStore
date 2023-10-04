const allGamesPage = async () => {
  async function getData(url: string) {
    const response = await fetch(url);
    const responseData = await response.json();
    return responseData;
  }

  return (
    <>
      <div>все игры</div>
    </>
  );
};

export default allGamesPage;
