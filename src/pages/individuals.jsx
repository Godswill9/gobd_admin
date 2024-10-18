import React, { Component } from 'react'
import Header from './header'
import Sidebar from './sidebar'

export default class Individuals extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Sidebar/>
        <div className="container">
    individuals
   </div>
       
      </div>
    )
  }
}
