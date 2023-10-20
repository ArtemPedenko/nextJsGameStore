"use client";

import { db } from "@/app/firebase/firebase";
import { useAppSelector } from "@/app/store/hooks";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import GameCard from "./components/GameCard";
import styled from "styled-components";
import Offer from "./components/Offer";
import Empty from "./components/Empty";

const Wrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 auto;
  justify-content: space-between;
`;
const GamesWrapper = styled.div`
  width: 60%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const OfferWrapper = styled.div`
  width: 35%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CartPage = () => {
  const userData = useAppSelector((state) => state.games.userData);

  const [empty, setEmpty] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [cart, setCart] = useState<
    Record<
      string,
      { id: string; namespace: string; price: string; thumbnail: string }
    >
  >({});

  useEffect(() => {
    let sum = 0;
    async function getUserWishlist(userEmail: string) {
      const docRef = doc(db, "usersData", userEmail + "&cart");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (Object.keys(data).length === 0) {
          setEmpty(true);
          return null;
        }
        Object.keys(data).map((item: string) => {
          const regExp = new RegExp(/[0-9.]/g);
          const gamePrice = data[item].price.match(regExp)?.join("");
          if (gamePrice) {
            sum = sum + parseFloat(gamePrice);
          }
        });
        setTotalPrice(sum);
        console.log("1");
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
      <Wrapper>
        <GamesWrapper>
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
        </GamesWrapper>
        {Object.keys(cart).length != 0 ? (
          <OfferWrapper>
            <Offer totalPrice={totalPrice} />
          </OfferWrapper>
        ) : null}
      </Wrapper>
      {empty ? <Empty /> : null}
    </>
  );
};

export default CartPage;
