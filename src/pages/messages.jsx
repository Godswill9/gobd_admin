import React, { Component } from 'react'
import Header from './header'
import Sidebar from './sidebar'

export default class Messages extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Sidebar/>
        <div className="container">
       messages
   </div>
     
      </div>
    )
  }
}
