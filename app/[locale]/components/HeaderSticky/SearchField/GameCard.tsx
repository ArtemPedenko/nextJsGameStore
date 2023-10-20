import styled from "styled-components";
import { FC } from "react";
import Link from "next/link";

interface Igame {
  game: {
    title: string;
    id: string;
    namespace: string;
    img: string;
    url: string;
  };
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  cursor: pointer;
  padding: 5px 10px;
  &:hover {
    text-decoration: underline;
  }
`;
const GameImg = styled.img`
  width: 35px;
  object-fit: contain;
  margin-right: 10px;
`;

const GameCard: FC<Igame> = ({ game }) => {
  return (
    <>
      <Wrapper>
        <GameImg alt={game.title} src={game.img} />
        <Link
          href={`/${game.url}/${game.id}/${game.namespace}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <p>{game.title}</p>
        </Link>
      </Wrapper>
    </>
  );
};

export default GameCard;
