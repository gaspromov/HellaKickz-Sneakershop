import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import Button from '../../components/Button/Button'
import SizeTable from '../../components/SizeTable/SizeTable'

import styles from './Faq.module.scss'

const Faq = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Faq</h1>
      <div className={styles.container}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Как подобрать размер</h2>
          <p className={styles.sectionText}>
            Повседневная практика показывает, что постоянный количественный рост и сфера нашей активности требует <br />
            определения и уточнения новых предложений? <br />
            Задача организации, в особенности же консультация с профессионалами...
          </p>
        </section>
        <section className={styles.sectionSizes}>
          <h2 className={styles.sectionSizesTitle}>Размерные сетки</h2>
          <Tabs className={styles.tabs}>
            <TabList className={styles.tabList}>
              <Tab className={styles.tab} selectedClassName={styles.tabSelected}>
                <Button type="button" style="regular" className={styles.tabButton} text="Обувь" />
              </Tab>
              <Tab className={styles.tab} selectedClassName={styles.tabSelected} >
                <Button type="button" style="regular" className={styles.tabButton} text="Детская обувь Nike" />
              </Tab>
              <Tab className={styles.tab} selectedClassName={styles.tabSelected}>
                <Button type="button" style="regular" className={styles.tabButton} text="Детская обувь Adidas" />
              </Tab>
            </TabList>

            <div className={styles.tabTables}>
              <TabPanel><SizeTable type="sneakers" /></TabPanel>
              <TabPanel><SizeTable type="nikeChildish" /></TabPanel>
              <TabPanel><SizeTable type="adidasChildish" /></TabPanel>
            </div>
          </Tabs>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Доставка</h2>
          <p className={styles.sectionText}>
            Повседневная практика показывает, что постоянный количественный рост и сфера нашей активности <br />
            требует определения и уточнения новых предложений? <br />
            Задача организации, в особенности же консультация с профессионалами...
          </p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Возврат и обмен</h2>
          <p className={styles.sectionText}>
            Повседневная практика показывает, что постоянный количественный рост и сфера нашей активности <br />
            требует определения и уточнения новых предложений? <br />
            Задача организации, в особенности же консультация с профессионалами...
          </p>
        </section>
      </div>
    </div>
  )
}

export default Faq
