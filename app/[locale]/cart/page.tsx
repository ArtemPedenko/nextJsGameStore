"use client";

import { db } from "@/app/firebase/firebase";
import { useAppSelector } from "@/app/store/hooks";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import GameCard from "./GameCard";

const CartPage = () => {
  const userData = useAppSelector((state) => state.games.userData);

  const [cart, setCart] = useState<
    Record<
      string,
      { id: string; namespace: string; price: string; thumbnail: string }
    >
  >({});

  useEffect(() => {
    async function getUserWishlist(userEmail: string) {
      const docRef = doc(db, "usersData", userEmail + "&cart");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setCart(data);
      } else {
        console.log("No such document!");
      }
    }

    if (userData) {
      getUserWishlist(userData.email);
    }
  }, [userData]);

  return (
    <>
      {Object.keys(cart).map((item: string) => {
        const game = {
          email: userData.email,
          title: item,
          id: cart[item].id,
          namespace: cart[item].namespace,
          thumbnail: cart[item].thumbnail,
          price: cart[item].price,
        };

        return (
          <div key={item}>
            <GameCard game={game} setWishlist={setCart} wishlist={cart} />
          </div>
        );
      })}
    </>
  );
};

export default CartPage;
