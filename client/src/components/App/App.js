import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import ScrollMemory from 'react-router-scroll-memory'
import Homepage from '../../screens/Homepage/Homepage'
import Header from '../Header/Header'
import AdminHeader from '../AdminHeader/AdminHeader'
import AdminAuth from '../../screens/AdminAuth/AdminAuth'
import AdminDashboard from '../../screens/AdminDashboard/AdminDashboard'
import AdminAddItem from '../../screens/AdminAddItem/AdminAddItem'
import AdminEditItem from '../../screens/AdminEditItem/AdminEditItem'
import Catalogue from '../../screens/Catalogue/Catalogue'
import ProductPage from '../../screens/ProductPage/ProductPage'
import Faq from '../../screens/Faq/Faq'
import Policy from '../../screens/Policy/Policy'
import Footer from '../Footer/Footer'
import { Element } from 'react-scroll'

import styles from './App.module.scss'

const App = () => {
  const renderHeader = () => {
    if (window.location.href.includes('admin/')) return <AdminHeader />
    else if (window.location.href.includes('user_agreement')) return <></>
    else return <Header />
  }

  return (
    <div className={styles.wrapper}>
      {renderHeader()}
      <ScrollMemory />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/catalog" component={Catalogue} />
        <Route path="/product/:id" component={ProductPage} />
        <Route path="/admin/auth" component={AdminAuth} />
        <Route path="/admin/dashboard" component={AdminDashboard} />
        <Route path="/admin/add" component={AdminAddItem} />
        <Route path="/admin/edit/:id" component={AdminEditItem} />
        <Route path="/faq" component={Faq} />
        <Route path="/user_agreement" component={Policy} />
        <Route render={() => <Redirect to={{ pathname: "/" }} />} />
      </Switch>
      {
        !window.location.href.includes('admin') && !window.location.href.includes('user_agreement') && (
          <Element name="contacts">
            <Footer />
          </Element>
        )
      }
    </div >
  )
}

export default App
