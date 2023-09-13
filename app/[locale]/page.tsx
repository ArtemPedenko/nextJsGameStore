import { getI18n } from '../../locales/server'
import Header from "./modules/Header"

export default async function Home() {
  const t = await getI18n()
  return (
    <section>
      <p>{t('store')}</p>


      this start page?</section>
  )
}
