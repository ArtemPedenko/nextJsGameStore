const ProductPage = async ({ params }) => {
  const url = `https://store-content-ipv4.ak.epicgames.com/api/ru/content/products/${params.product}`;
  const response = await fetch(url);

  const responseData = await response.json();

  console.log(responseData.pages[0].data.about.description);
  return (
    <div>
      <h1>Product ID: {params.product}</h1>
      <div>{JSON.stringify(responseData.pages[0].data.about.description)}</div>
    </div>
  );
};

export default ProductPage;
