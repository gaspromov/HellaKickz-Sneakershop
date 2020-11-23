import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Homepage from '../../screens/Homepage/Homepage'
import Header from '../Header/Header'
import AdminHeader from '../AdminHeader/AdminHeader'
import AdminAuth from '../../screens/AdminAuth/AdminAuth'
import AdminDashboard from '../../screens/AdminDashboard/AdminDashboard'
import AdminAddItem from '../../screens/AdminAddItem/AdminAddItem'
import AdminEditItem from '../../screens/AdminEditItem/AdminEditItem'
import Catalogue from '../../screens/Catalogue/Catalogue'
import ProductPage from '../../screens/ProductPage/ProductPage'
import Footer from '../Footer/Footer'

const App = () => {
  return (
    <Router>
      {
        window.location.href.includes('admin')
          ? <AdminHeader />
          : <Header />
      }
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/catalogue" component={Catalogue} />
        <Route path="/product/:id" component={ProductPage} />
        <Route path="/admin/auth" component={AdminAuth} />
        <Route path="/admin/dashboard" component={AdminDashboard} />
        <Route path="/admin/add" component={AdminAddItem} />
        <Route path="/admin/edit/:id" component={AdminEditItem} />
      </Switch>
      {/* {
        !window.location.href.includes('admin')
        && <Footer />
      } */}
    </Router>
  )
}

export default App
