import ProductSlider from "../components/ProductSlider";
import StickyGameInfo from "../modules/StickyGameInfo";

const ProductPage = async ({ params }) => {
  const url = `https://store-content-ipv4.ak.epicgames.com/api/${params.locale}/content/products/${params.product}`;

  const response = await fetch(url);
  const responseData = await response.json();
  const data = responseData.pages[1];
  if (data) {
    const offerUrl = `https://store.epicgames.com/graphql?operationName=getCatalogOffer&variables=%7B%22locale%22:%22${params.locale}%22,%22country%22:%22RU%22,%22offerId%22:%22${data.data.editions.editions[0].offerId}%22,%22sandboxId%22:%22${data.data.editions.editions[0].namespace}%22%7D&extensions=%7B%22persistedQuery%22:%7B%22version%22:1,%22sha256Hash%22:%22c4ad546ad2757b60ff13ace19ffaf134abb23cb663244de34771a0444abfdf33%22%7D%7D`;
    const offerResponse = await fetch(offerUrl);
    const offerData = await offerResponse.json();
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
          <StickyGameInfo data={data.data} offerData={offerData} />
        </div>
      </div>
    );
  } else {
    return <div>Полномочия - всё</div>;
  }
};

export default ProductPage;
