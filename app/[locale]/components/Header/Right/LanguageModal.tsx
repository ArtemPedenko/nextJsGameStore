// @ts-nocheck

"use client";

import styled from "styled-components";
import ReactModal from "react-modal";
import { FC, RefObject } from "react";
import { useChangeLocale } from "@/locales/client";
//
const LanguageButton = styled.button`
  background: none;
  border: none;
  color: #b8b8b8;
  font-size: 0.625em;
  &:hover {
    cursor: pointer;
    color: #ffffff;
  }
`;

interface ModalProps {
  isOpen: boolean;
  close: Function;
  open: Function;
  parentRef: RefObject<HTMLElement>;
}

const LanguageModal: FC<ModalProps> = ({ isOpen, close, open, parentRef }) => {
  const changeLocale = useChangeLocale();
  const locationLeft =
    Number(parentRef.current?.getBoundingClientRect().left) - 50 + "px";

  return (
    <div onMouseEnter={() => open()} onMouseLeave={() => close()}>
      <ReactModal
        isOpen={isOpen}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: "none",
            width: "180px",
            height: "180px",
            zIndex: 12,
            position: "absolute",
          },
          content: {
            width: "100px",
            backgroundColor: "#2a2a2a",
            left: locationLeft,
            top: "50px",
            display: "flex",
            flexDirection: "column",
            border: "none",
            borderRadius: "none",
            gap: "5px",
          },
        }}
      >
        <LanguageButton onClick={() => changeLocale("en")}>
          ENGLISH
        </LanguageButton>
        <LanguageButton onClick={() => changeLocale("ru")}>
          РУССКИЙ
        </LanguageButton>
      </ReactModal>
    </div>
  );
};

export default LanguageModal;
