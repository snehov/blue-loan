import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, IndexLink } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import Home from './pages/Home'
import './App.css'

const history = createBrowserHistory()

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Route exact path="/" component={Home} />
      </Router>
    )
  }
}

export default App
