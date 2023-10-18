import "./page.css";
import ProductSlider from "../components/ProductSlider";
import StickyGameInfo from "../components/StickyGameInfo";
import Logger from "./logger";
import { getI18n } from "@/locales/server";

const ProductPage = async ({
  params,
}: {
  params: { locale: string; product: string[] };
}) => {
  const t = await getI18n();

  async function getData(url: string) {
    const response = await fetch(url);
    const responseData = await response.json();
    return responseData;
  }

  const productImagesUrl = `https://store.epicgames.com/graphql?operationName=getProductHomeConfig&variables=%7B%22locale%22:%22${params.locale}%22,%22sandboxId%22:%22${params.product[2]}%22%7D&extensions=%7B%22persistedQuery%22:%7B%22version%22:1,%22sha256Hash%22:%225a922bd3e5c84b60a4f443a019ef640b05cb0ae379beb4aca4515bf9812dfcb4%22%7D%7D`;
  const productImagesUrlAnother = `https://store-content-ipv4.ak.epicgames.com/api/${params.locale}/content/products/${params.product[0]}`;
  const offerUrl = `https://store.epicgames.com/graphql?operationName=getCatalogOffer&variables=%7B%22locale%22:%22${params.locale}%22,%22country%22:%22RU%22,%22offerId%22:%22${params.product[1]}%22,%22sandboxId%22:%22${params.product[2]}%22%7D&extensions=%7B%22persistedQuery%22:%7B%22version%22:1,%22sha256Hash%22:%22c4ad546ad2757b60ff13ace19ffaf134abb23cb663244de34771a0444abfdf33%22%7D%7D`;

  let productImageData = await getData(productImagesUrl);
  const offerData = await getData(offerUrl);

  let imageArray: string[] = [];
  let thumbnailImage: string;

  offerData.data.Catalog.catalogOffer.keyImages.map(
    (item: { type: string; url: string }) => {
      if (item.type === "Thumbnail") {
        thumbnailImage = item.url;
      }
    }
  );

  type TofferDataObj = {
    description: string;
    offerType: string;
    price: string;
    title: string;
    developer: string;
    genres: {
      id: string;
      name: string;
      groupName: string;
    }[];
    id: string;
    namespace: string;
    //thumbnail: string;
  };

  let offerDataObj: TofferDataObj = {
    description: offerData.data.Catalog.catalogOffer?.description,
    offerType: offerData.data.Catalog.catalogOffer?.offerType,
    price:
      offerData.data.Catalog.catalogOffer?.price.totalPrice.fmtPrice
        .originalPrice,
    title: offerData.data.Catalog.catalogOffer?.title,
    developer: offerData.data.Catalog.catalogOffer?.developerDisplayName,
    genres: offerData.data.Catalog.catalogOffer?.tags,
    id: params.product[1],
    namespace: params.product[2],
    //thumbnail: thumbnailImage,
  };

  if (productImageData.data.Product?.sandbox.configuration[1] === undefined) {
    productImageData = await getData(productImagesUrlAnother);
    if (productImageData.pages === undefined) {
      offerData.data.Catalog.catalogOffer?.keyImages.map(
        (item: { type: string; url: string }) => {
          if (item.type === "featuredMedia") {
            imageArray.push(item.url);
          }
        }
      );
    } else {
      const regexp = new RegExp(/[0-9]{4}x[0-9]{4}/);

      productImageData.pages[0]._images_.map((item: string) => {
        const imgResolution = JSON.stringify(item.match(regexp)).split("x");
        const regExp2 = new RegExp(/[^\d]/g);

        if (imgResolution.length === 2) {
          const firstRes = imgResolution[0].replace(regExp2, "");
          const secondRes = imgResolution[1].replace(regExp2, "");

          if (+firstRes[0] > +secondRes[1]) {
            imageArray.push(item);
          }
        }
      });
    }
  } else if (productImageData.data.Product.sandbox.configuration[1]) {
    productImageData.data.Product.sandbox.configuration[1].configs.keyImages.map(
      (item: any) => {
        if (item.type === "featuredMedia") {
          imageArray.push(item.url);
        }
      }
    );
  }

  return (
    <>
      <Logger data={offerData.data.Catalog.catalogOffer} />

      <div className="product-page">
        <div className="product-slider">
          <ProductSlider data={imageArray} />
          <div>{offerDataObj.description}</div>
          <h2>
            {t(`developer`)} : {offerDataObj.developer}
          </h2>
          <div className="genres">
            <div className="genres-block">
              <h3>{t(`genres`)}:</h3>
              {offerDataObj.genres?.map((item: any) => {
                if (item.groupName === "genre") {
                  return <div>{item.name}</div>;
                }
              })}
            </div>
            <div className="genres-block">
              <h3>{t(`features`)}:</h3>
              {offerDataObj.genres?.map((item: any) => {
                if (item.groupName === "feature") {
                  return <div>{item.name}</div>;
                }
              })}
            </div>
          </div>
        </div>
        <StickyGameInfo offerData={offerDataObj} />
      </div>
    </>
  );
};

export default ProductPage;
