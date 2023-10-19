import { FC } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import { useI18n } from "@/locales/client";
import { addToWishlist, deleteFromCart } from "@/app/utils/firebaseDb";
import omit from "lodash/omit";

const GameCardWrapper = styled.div`
  background-color: #2a2a2a;
  max-width: 90%;
  margin: 15px auto;
  display: flex;
  flex-direction: row;
  padding: 10px;
  border-radius: 8px;
`;

const CardRight = styled.div`
  display: flex;
  width: 70%;
  flex-direction: column;
  align-items: start;
  margin-left: 15px;
`;

const GameImg = styled.img`
  max-width: 20%;
  min-width: 80px;
  object-fit: contain;
  border-radius: 8px;
`;

const Delete = styled.div`
  text-decoration: underline;
  cursor: pointer;
  color: #a0a0a0;
`;
const ButtonsBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  gap: 10px;
  margin: auto 0 0 auto;
`;

interface Igame {
  game: {
    email: string;
    title: string;
    id: string;
    namespace: string;
    price: string;
    thumbnail: string;
  };
  setWishlist: Function;
  wishlist: Record<
    string,
    { id: string; namespace: string; price: string; thumbnail: string }
  >;
}

const GameCard: FC<Igame> = ({ game, setWishlist, wishlist }) => {
  const t = useI18n();

  return (
    <GameCardWrapper>
      <GameImg alt={game.title} src={game.thumbnail} />
      <CardRight>
        <h3>{game.title}</h3>
        <p>{game.price === "0" ? t("price_free") : game.price}</p>
        <ButtonsBlock>
          <Delete
            onClick={() => {
              setWishlist(omit(wishlist, game.title));
              deleteFromCart(game.email, game.title);
            }}
          >
            {t("delete")}
          </Delete>
          <Delete
            onClick={() =>
              addToWishlist(
                game.email,
                game.id,
                game.namespace,
                game.title,
                game.thumbnail,
                game.price
              )
            }
          >
            {t("add_to_wishlist")}
          </Delete>
        </ButtonsBlock>
      </CardRight>
    </GameCardWrapper>
  );
};

export default GameCard;
