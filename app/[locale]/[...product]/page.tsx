import ProductSlider from "../components/ProductSlider";
import StickyGameInfo from "../modules/StickyGameInfo";
import Logger from "./logger"

const ProductPage = async ({ params }) => {
  console.log(params.product[1])
  const url = `https://store-content-ipv4.ak.epicgames.com/api/${params.locale}/content/products/${params.product[0]}`;
  const response = await fetch(url)
  const responseData = await response.json();
  const data = responseData.pages[1];
  const offerUrl = `https://store.epicgames.com/graphql?operationName=getCatalogOffer&variables=%7B%22locale%22:%22${params.locale}%22,%22country%22:%22RU%22,%22offerId%22:%22${params.product[1]}%22,%22sandboxId%22:%22${params.product[2]}%22%7D&extensions=%7B%22persistedQuery%22:%7B%22version%22:1,%22sha256Hash%22:%22c4ad546ad2757b60ff13ace19ffaf134abb23cb663244de34771a0444abfdf33%22%7D%7D`;
  const offerResponse = await fetch(offerUrl);
  const offerData = await offerResponse.json();
  console.log(offerData)

  if (data) {
    
    return (
      <div>
        id {params.product[1]} <br/>
        namespace {params.product[2]}
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
          <StickyGameInfo data={data.data} offerData={offerData} />
        </div>
      </div>
    );
  } else {
    return (<><div>Полномочия - всё</div>
    <Logger data={offerData}/>
    </>);
  }
};

export default ProductPage;
