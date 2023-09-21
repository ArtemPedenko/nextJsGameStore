"use client";
import { ReactElement } from "react";
import { I18nProviderClient } from "../../locales/client";
import Header from "./modules/Header";
import HeaderSticky from "./modules/HeaderSticky";
import { Providers } from "../store/provider";

export default function SubLayout({
  children,
  params,
}: {
  children: ReactElement;
  params: { locale: string };
}) {
  return (
    <Providers>
      <I18nProviderClient locale={params.locale}>
        <Header />
        <HeaderSticky />
        {children}
      </I18nProviderClient>
    </Providers>
  );
}
