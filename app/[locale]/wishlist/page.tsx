"use client";

import { db } from "@/app/firebase/firebase";
import { useAppSelector } from "@/app/store/hooks";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  updateDoc,
  deleteField,
  FieldValue,
} from "firebase/firestore";
import GameCard from "./components/GameCard";

const WishlistPage = () => {
  const userData = useAppSelector((state) => state.games.userData);

  const [wishlist, setWishlist] = useState<
    Record<
      string,
      { id: string; namespace: string; price: string; thumbnail: string }
    >
  >({});

  useEffect(() => {
    async function getUserWishlist(userEmail: string) {
      const docRef = doc(db, "usersData", userEmail + "&wishList");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setWishlist(data);
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
      {Object.keys(wishlist).map((item: string) => {
        const game = {
          email: userData.email,
          title: item,
          id: wishlist[item].id,
          namespace: wishlist[item].namespace,
          thumbnail: wishlist[item].thumbnail,
          price: wishlist[item].price,
        };

        return (
          <div key={item}>
            <GameCard
              game={game}
              setWishlist={setWishlist}
              wishlist={wishlist}
            />
          </div>
        );
      })}
    </>
  );
};

export default WishlistPage;
