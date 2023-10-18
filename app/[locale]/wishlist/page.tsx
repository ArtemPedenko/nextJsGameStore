"use client";

import { useAppSelector } from "@/app/store/hooks";
import { getUserWishlist, deleteFromWishlist } from "@/app/utils/firebaseDb";
import { useEffect, useState } from "react";

const WishlistPage = () => {
  /* const userData = useAppSelector((state) => state.games.userData);
  //
  const [wishlist, setWishlist] = useState<
    Record<string, { id: string; namespace: string }>
  >({});
  const [wishlistData, setWishListData] = useState<any>();

  useEffect(() => {
    let gamesArray: any[] = [];
    async function getWishlistData(
      id: string,
      namespace: string,
      index: number
    ) {
      fetch(`/en/api/wishlist?id=${id}&namespace=${namespace}`)
        .then(function (serverPromise) {
          serverPromise.json().then((data) => {
            gamesArray.push(data.data.Catalog.catalogOffer);
            //console.log(gamesArray);
            setWishListData(gamesArray);
            //console.log(wishlistData);
          });
        })
        .catch(function (e) {
          console.log(e);
        });
    }
    getUserWishlist(userData.email).then((response) => {
      console.log("useEffect");
      if (response) {
        Object.keys(response).map((item: string, index: number) => {
          getWishlistData(response[item].id, response[item].namespace, index);
        });
        //setWishListData(gamesArray);
      }
    });
  }, [userData]);

  return (
    <>
      
      <div>
        {wishlistData ? (
          wishlistData.map((item, index: number) => {
            console.log(item);
            return <div key={index}>{item.title}</div>;
          })
        ) : (
          <></>
        )}
      </div>
    </>
  ); */
};

export default WishlistPage;
