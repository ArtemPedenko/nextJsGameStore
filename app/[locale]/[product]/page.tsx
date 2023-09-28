import ProductSlider from "../components/ProductSlider";
import StickyGameInfo from "../modules/StickyGameInfo";

const ProductPage = async ({ params }) => {
  const url = `https://store-content-ipv4.ak.epicgames.com/api/${params.locale}/content/products/${params.product}`;
  const response = await fetch(url);
  const responseData = await response.json();
  const data = responseData.pages[1];

  if (data) {
    return (
      <div>
        <h1>{data?.data.about.title}</h1>
        <div
          style={{
            width: "1600px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: "1200px" }}>
            <ProductSlider data={data?.data} />
          </div>
          {/* <div
            style={{
              width: "320px",
              border: "1px solid red",
              backgroundColor: "white",
            }}
          >
            <img alt="" src={data?.data.hero.logoImage.src} />
          </div> */}
          <StickyGameInfo data={data.data} />
        </div>
      </div>
    );
  } else {
    return <div>Полномочия - всё</div>;
  }
};

export default ProductPage;
