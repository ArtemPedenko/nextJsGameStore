// @ts-nocheck

"use client";

import { useAppSelector } from "@/app/store/hooks";
import { getUserWishlist, deleteFromWishlist } from "@/app/utils/firebaseDb";
import { useEffect, useState } from "react";

const WishlistPage = () => {
  const userData = useAppSelector((state) => state.games.userData);
  const [wishlist, setWishlist] = useState({});
  const [wishlistData, setWishListData] = useState("");
  let gamesArray: any[] = [];
  async function getWishlistData(id: string, namespace: string) {
    fetch(`/en/api/wishlist?id=${id}&namespace=${namespace}`)
      .then(function (serverPromise) {
        serverPromise
          .json()
          .then(function (data) {
            gamesArray.push(data);
          })
          .catch(function (e) {
            console.log(e);
          });
      })
      .catch(function (e) {
        console.log(e);
      });
  }

  Object.keys(wishlist).map((item: string) => {
    getWishlistData(wishlist[item].id, wishlist[item].namespace);
    console.log(gamesArray);
  });

  useEffect(() => {
    getUserWishlist(userData.email).then((response) => {
      setWishlist(response || {});
    });
  }, [userData]);
  return (
    <>
      {Object.keys(wishlist).map((item: string) => {
        return (
          <div key={item}>
            {item}
            {wishlist[item].id}
          </div>
        );
      })}
    </>
  );
};

export default WishlistPage;
