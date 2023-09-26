import ProductSlider from "../components/ProductSlider";

const ProductPage = async ({ params }) => {
  const url = `https://store-content-ipv4.ak.epicgames.com/api/ru/content/products/${params.product}`;
  const response = await fetch(url);
  const responseData = await response.json();
  const data = responseData.pages[1];

  console.log(responseData);
  return (
    <div>
      <h1>{data.data.about.title}</h1>
      <ProductSlider data={data.data} />
    </div>
  );
};

export default ProductPage;
