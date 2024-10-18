import React, { Component } from 'react'
import Header from './header'
import Sidebar from './sidebar'

export default class Dashboard extends Component {
  render() {
    return (
      <div >
        <Header/>
        <Sidebar/>
        <div className="container">
            Dashboard
        </div>
      </div>
    )
  }
}