"use client";

import Link from 'next/link'
import { useChangeLocale, useCurrentLocale } from "../locales/client";



export function HeaderTest() {
  const changeLocale = useChangeLocale();

  return (
    <div style={{
      backgroundColor: "black",
      color: "white", display: "flex",
      gap: "30px", height: "50px",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <button style={{ color: "white", background: "none" }} type="button" onClick={() => changeLocale("en")}>
        EN
      </button>
      <button style={{ color: "white", background: "none" }} type="button" onClick={() => changeLocale("ru")}>
        RU
      </button>
      <Link style={{ color: "white", textDecoration: "none" }} href="/"> start page</Link>
    </div>

  );
}