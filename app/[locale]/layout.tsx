'use client'
import { ReactElement } from 'react'
import { I18nProviderClient } from '../../locales/client'
import Header from "./modules/Header"


export default function SubLayout({
  children,
  params
}: {
  children: ReactElement
  params: { locale: string }
}) {
  return (
    <I18nProviderClient locale={params.locale}>
        <Header/>
      {children}
    </I18nProviderClient>
  )
}