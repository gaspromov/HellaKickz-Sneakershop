import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AdminHeader from '../AdminHeader/AdminHeader'

const App = () => {
  return (
    <Router>
      <AdminHeader />
      <Switch>
      </Switch>
    </Router>
  )
}

export default App
