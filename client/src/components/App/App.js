import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AdminHeader from '../AdminHeader/AdminHeader'
import AdminAuth from '../../screens/AdminAuth/AdminAuth'
import AdminDashboard from '../../screens/AdminDashboard/AdminDashboard'
import AdminAddItem from '../../screens/AdminAddItem/AdminAddItem'

const App = () => {
  return (
    <Router>
      <AdminHeader />
      <Switch>
        <Route path="/admin/auth" component={AdminAuth} />
        <Route path="/admin/dashboard" component={AdminDashboard} />
        <Route path="/admin/add" component={AdminAddItem} />
      </Switch>
    </Router>
  )
}

export default App
