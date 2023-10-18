// @ts-nocheck
"use client";
import { ReactElement, Suspense, useEffect } from "react";
import { I18nProviderClient } from "../../locales/client";
import Header from "./components/Header";
import HeaderSticky from "./components/HeaderSticky";
import Footer from "./components/Footer";
import { Providers } from "../store/provider";
import Loading from "./loading";

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
        <Suspense fallback={<Loading />}>{children}</Suspense>
        <Footer />
      </I18nProviderClient>
    </Providers>
  );
}
