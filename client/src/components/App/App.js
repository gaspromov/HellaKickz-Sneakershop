import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AdminHeader from '../AdminHeader/AdminHeader'
import AdminAuth from '../../screens/AdminAuth/AdminAuth'

const App = () => {
  return (
    <Router>
      <AdminHeader />
      <Switch>
        <Route path="/admin-auth" component={AdminAuth} />
      </Switch>
    </Router>
  )
}

export default App
