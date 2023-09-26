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
      <div
        style={{
          width: "1600px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          border: "1px solid red",
        }}
      >
        <div style={{ width: "1200px" }}>
          <ProductSlider data={data.data} />
        </div>
        <div
          style={{
            width: "320px",
            border: "1px solid red",
          }}
        >
          asd
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
