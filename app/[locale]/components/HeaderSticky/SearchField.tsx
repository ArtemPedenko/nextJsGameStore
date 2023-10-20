"use client";

import styled from "styled-components";
import IconWrapper from "../IconWrapper";
import SearchLogo from "@/images/SearchLogo";
import { useI18n } from "@/locales/client";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import { setSearchGames } from "@/app/store/slice";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import GameCard from "./SearchField/GameCard";

let myInterval: any;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  background-color: #202020;
  height: 40px;
  width: 230px;
  align-items: center;
  border-radius: 24px;
`;

const Search = styled.input`
  background-color: #202020;
  height: 35px;
  width: 180px;
  color: white;
  outline: none;
  border: 0;
  border-radius: 24px;
  &:focus: {
    background-color: red;
  }
`;

const SearchingGames = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #2a2a2a;
  position: absolute;
  top: 110%;
  width: 200%;
  max-width: 90vw;
  border-radius: 8px;
  z-index: 12;
  box-shadow: 13px 13px 8px 0px rgba(0, 0, 0, 0.35);
`;

const SpeenWheel = styled.div`
  margin: 50px auto;
  border: 4px solid black;
  border-radius: 50%;
  border-top: 4px solid #f3f3f3;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const SearchField = () => {
  const t = useI18n();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const searchGames = useAppSelector((state) => state.games.searchGames);
  const [inputValue, setInputValue] = useState("");
  let arr: any[] = [];

  function delaySearching(searchText: string) {
    clearInterval(myInterval);
    if (searchText === "") {
      dispatch(setSearchGames([]));
      return null;
    }
    myInterval = setInterval(getSearchingData, 1000, searchText);
  }

  useEffect(() => {
    setInputValue("");
    dispatch(setSearchGames([]));
  }, [pathname]);

  async function getSearchingData(searchText: string) {
    clearInterval(myInterval);
    fetch(`/en/api/searchfield?search=${searchText}`)
      .then((serverPromise) => {
        serverPromise
          .json()
          .then((data) => {
            const gamesArray = data.data.Catalog.searchStore.elements;
            gamesArray.map((item: { offerId: string; sandboxId: string }) => {
              fetch(
                `/en/api/wishlist?id=${item.offerId}&namespace=${item.sandboxId}`
              )
                .then((sPromise) => {
                  sPromise.json().then((data) => {
                    const game = data.data.Catalog.catalogOffer;
                    let imgUrl = "";

                    game.keyImages.map(
                      (gameItem: { type: string; url: string }) => {
                        if (gameItem.type === "Thumbnail") {
                          imgUrl = gameItem.url;
                        }
                      }
                    );

                    type TgameObj = {
                      title: string;
                      id: string;
                      namespace: string;
                      img: string;
                      url: string;
                    };
                    const gameObj: TgameObj = {
                      title: game.title,
                      id: game.id,
                      namespace: game.namespace,
                      img: imgUrl,
                      url: game.urlSlug,
                    };
                    arr.push(gameObj);
                    if (gamesArray.length === arr.length) {
                      dispatch(setSearchGames(arr));
                    }
                  });
                })
                .catch((e) => {
                  console.log(e);
                });
            });
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <SearchContainer>
      <IconWrapper
        icon={<SearchLogo />}
        height="18px"
        width="18px"
        margin="0"
        padding="10px"
      />
      <Search
        placeholder={t(`search`)}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          delaySearching(e.target.value);
        }}
      ></Search>
      {inputValue ? (
        <SearchingGames>
          {searchGames.length ? (
            searchGames.map((item) => {
              return <GameCard game={item} />;
            })
          ) : (
            <SpeenWheel />
          )}
        </SearchingGames>
      ) : null}
    </SearchContainer>
  );
};

export default SearchField;
