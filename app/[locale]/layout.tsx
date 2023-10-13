// @ts-nocheck
"use client";
import { ReactElement, Suspense } from "react";
import { I18nProviderClient } from "../../locales/client";
import Header from "./modules/Header";
import HeaderSticky from "./modules/HeaderSticky";
import Footer from "./modules/Footer";
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
        <Suspense>
          <Header />
          <HeaderSticky />
          {children}
          <Footer />
        </Suspense>
      </I18nProviderClient>
    </Providers>
  );
}
