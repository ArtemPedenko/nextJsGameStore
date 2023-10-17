// @ts-nocheck

"use client";

import { useAppSelector } from "@/app/store/hooks";
import { getUserWishlist, deleteFromWishlist } from "@/app/utils/firebaseDb";
import { useEffect, useState } from "react";

const WishlistPage = () => {
  const userData = useAppSelector((state) => state.games.userData);
  const [wishlist, setWishlist] = useState({});

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
