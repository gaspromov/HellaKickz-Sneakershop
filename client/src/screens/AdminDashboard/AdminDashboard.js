import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { NavLink, useLocation } from 'react-router-dom'
import queryString from 'query-string'
import AdminCallbacks from '../../components/AdminCallbacks/AdminCallbacks'
import AdminItems from '../../components/AdminItems/AdminItems'
import AdminPhotos from '../../components/AdminPhotos/AdminPhotos'
import AdminFeedbacks from '../../components/AdminFeedbacks/AdminFeedbacks'

import styles from './AdminDashboard.module.scss'

const AdminDashboard = ({ history }) => {
  const [index, setIndex] = useState(0)
  const location = useLocation()
  const { isLoggedIn } = useSelector(({ user }) => user)

  useEffect(() => {
    if (!isLoggedIn) {
      history.push('/admin/auth')
    }
  }, [])

  useEffect(() => {
    const params = queryString.parse(location.hash)
    switch (params.section) {
      case 'callbacks':
        setIndex(0)
        break
      case 'items':
        setIndex(1)
        break
      case 'photos':
        setIndex(2)
        break
      case 'feedbacks':
        setIndex(3)
        break;
      default:
        setIndex(0)
        break
    }
  }, [location])

  return (
    <Tabs className={styles.tabs} selectedIndex={index} onSelect={(index) => setIndex(index)}>
      <h1 className="visually-hidden">Панель администратора</h1>
      <TabList className={styles.tabList}>
        <Tab className={styles.tab} selectedClassName={styles.tabSelected}>
          <NavLink to="/admin/dashboard#section=callbacks" className={styles.tabButton}>Callbacks</NavLink>
        </Tab>
        <Tab className={styles.tab} selectedClassName={styles.tabSelected}>
          <NavLink to="/admin/dashboard#section=items" className={styles.tabButton}>Items</NavLink>
        </Tab>
        <Tab className={styles.tab} selectedClassName={styles.tabSelected}>
          <NavLink to="/admin/dashboard#section=photos" className={styles.tabButton}>Photos</NavLink>
        </Tab>
        <Tab className={styles.tab} selectedClassName={styles.tabSelected}>
          <NavLink to="/admin/dashboard#section=feedbacks" className={styles.tabButton}>Feedbacks</NavLink>
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
