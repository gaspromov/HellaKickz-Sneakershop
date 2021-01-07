import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import Button from '../../components/Button/Button'
import SizeTable from '../../components/SizeTable/SizeTable'
import { Helmet } from 'react-helmet'

import styles from './Faq.module.scss'

const Faq = () => {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const elem = document.getElementById(location.hash.slice(1))
      if (elem) {
        setTimeout(() => {
          elem.scrollIntoView({ behavior: "smooth" })
        }, 500)
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    }
  }, [location])

  return (
    <main role="main">
      <Helmet>
        <meta name="description" content="Многие модели Yeezy и других кроссовок имеют не стандартный размер. Поможем Вам с выбором модели и размера." />
        <meta name="keywords" content="популярные вопросы, часто задаваемые вопросы, faq, кроссовки, изи, изи 350, YEEZY, yeezy boost, оригинал, только оригинал, yeezy 350 v2, купить изи 350, hellakickz, мода, Jordan, Off-White, офф вайт, yeezy 700, hypestation, депо, kickstown, айзел, aizel, nikita efremov, federation, фederation, оригинальные бренды, tsum, цум, Kanye west, канье вест, коллаборация, фарфетч, farfetch, supreme, kaws, суприм, кавс, travis scott, тревис скот, nike, dunk, virgil abloh, вирджил абло, yeezy black, yeezy white" />
        <title>Hellakickz – Размерная сетка обуви и частозадваемые вопросы</title>
      </Helmet>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Faq</h1>
        <div className={styles.container}>
          <section className={styles.section} id="sizes">
            <h2 className={styles.sectionTitle}>Как подобрать размер</h2>
            <p className={styles.sectionText}>
              Мы не хотим, чтобы Вы ошиблись с размером, поэтому прикрепили сюда размерные сетки необходимой одежды и обуви.
              <br />
              Обратите внимание, что все модели Yeezy маломерят на 0,5 размера, а модель Yeezy 700 V3 на размер.
          </p>
          </section>
          <section className={styles.sectionSizes}>
            <h2 className={styles.sectionSizesTitle}>Размерные сетки</h2>
            <Tabs className={styles.tabs}>
              <TabList className={styles.tabList}>
                <div className={styles.tabsContainer}>
                  <Tab className={styles.tab} selectedClassName={styles.tabSelected}>
                    <Button type="button" style="regular" className={styles.tabButton} text="Обувь – Nike" />
                  </Tab>
                  <Tab className={styles.tab} selectedClassName={styles.tabSelected}>
                    <Button type="button" style="regular" className={styles.tabButton} text="Обувь – Adidas" />
                  </Tab>
                  <Tab className={styles.tab} selectedClassName={styles.tabSelected} >
                    <Button type="button" style="regular" className={styles.tabButton} text="Детская обувь Nike" />
                  </Tab>
                  <Tab className={styles.tab} selectedClassName={styles.tabSelected}>
                    <Button type="button" style="regular" className={styles.tabButton} text="Детская обувь Adidas" />
                  </Tab>
                </div>
              </TabList>

              <div className={styles.tabTables}>
                <TabPanel><SizeTable type="nikeAdult" /></TabPanel>
                <TabPanel><SizeTable type="adidasAdult" /></TabPanel>
                <TabPanel><SizeTable type="nikeChildish" /></TabPanel>
                <TabPanel><SizeTable type="adidasChildish" /></TabPanel>
              </div>
            </Tabs>
          </section>
          <section className={styles.section} id="delivery">
            <h2 className={styles.sectionTitle}>Доставка</h2>
            <p className={styles.sectionText}>
              Мы осуществляем доставку по Москве и МО курьером по 100% предоплате, либо же привозим товар лично. Также осуществляем доставку по всему миру по 100% предоплате.
          </p>
          </section>
          <section className={styles.section} id="back">
            <h2 className={styles.sectionTitle}>Возврат и обмен</h2>
            <p className={styles.sectionText}>
              В том случае, если модель Вам не подошла, Вы всегда можете вернуть товар в том же состоянии не позднее чем через 2 недели после покупки.
          </p>
          </section>
        </div>
      </div>
    </main>
  )
}

export default Faq
