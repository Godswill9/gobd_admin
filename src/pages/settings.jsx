import React, { Component } from 'react'
import Header from './tools/header'
import Sidebar from './tools/sidebar'

export default class Settings extends Component {
  state = {
    sidebarVisible: true, // Set initial visibility
  };
  
  render() {
    return (
      <div>
        <Header/>
        <Sidebar visible={this.state.sidebarVisible} />
        <div className="container">
      <div className="containerSettings">
        <div className="headerSection">
          Settings
        </div>
        .
      </div>
   </div>
       
      </div>
    )
  }
}
