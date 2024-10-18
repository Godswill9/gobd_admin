import React, { Component } from 'react'
import '../../stylings/styles.css'; 

export default class Sidebar extends Component {
  render() {
    return (
      <div className='sideBar'>
         <div className="header-logo">
          <img src="image_asoroauto.webp" alt="Logo" /> {/* Replace with your logo */}
        </div>
           <ul>
            <li><a href="/">Dashoard</a></li>
            <li><a href="/individuals">Individuals</a></li>
            <li><a href="/settings">Settings</a></li>
            <li><a href="/messages">Messages</a></li>
            <li><a href="/support">Support</a></li>
          </ul>
          <div className="logout">Logout</div>
      </div>
    )
  }
}
