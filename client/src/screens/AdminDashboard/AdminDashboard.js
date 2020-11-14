import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import Button from '../../components/Button/Button'
import AdminCallbacks from '../../components/AdminCallbacks/AdminCallbacks'
import AdminItems from '../../components/AdminItems/AdminItems'
import AdminPhotos from '../../components/AdminPhotos/AdminPhotos'
import AdminFeedbacks from '../../components/AdminFeedbacks/AdminFeedbacks'

import styles from './AdminDashboard.module.scss'

const AdminDashboard = () => {
  return (
    <Tabs className={styles.tabs}>
      <h1 className="visually-hidden">Панель администратора</h1>
      <TabList className={styles.tabList}>
        <Tab className={styles.tab} selectedClassName={styles.tabSelected}>
          <Button type="button" style="regular" className={styles.tabButton} text="Callbacks" />
        </Tab>
        <Tab className={styles.tab} selectedClassName={styles.tabSelected} >
          <Button type="button" style="regular" className={styles.tabButton} text="Items" />
        </Tab>
        <Tab className={styles.tab} selectedClassName={styles.tabSelected}>
          <Button type="button" style="regular" className={styles.tabButton} text="Photos" />
        </Tab>
        <Tab className={styles.tab} selectedClassName={styles.tabSelected} >
          <Button type="button" style="regular" className={styles.tabButton} text="Feedbacks" />
        </Tab>
      </TabList>

      <div className={styles.panelWrapper}>
        <TabPanel><AdminCallbacks /></TabPanel>
        <TabPanel><AdminItems /></TabPanel>
        <TabPanel><AdminPhotos /></TabPanel>
        <TabPanel><AdminFeedbacks /></TabPanel>
      </div>
    </Tabs>
  )
}

export default AdminDashboard
