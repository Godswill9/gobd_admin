import React, { Component } from 'react'
import '../../../stylings/styles.css'; // Import the CSS file

export default class Sidebar extends Component {
  render() {
    const { visible } = this.props; // Destructure the visible prop

    if (!visible) {
      return null; // Don't render anything if visible is false
    }
    return (
      <div className='sideBar'>
         <div className="header-logo">
          <img src="image_asoroauto.webp" alt="Logo" /> {/* Replace with your logo */}
        </div>
           <ul>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/individuals">Individuals</a></li>
            {/* <li><a href="/individualsRequest">Settings</a></li> */}
            <li><a href="/messages">Messages</a></li>
            {/* <li><a href="/support">Support</a></li> */}
          </ul>
          <div className="logout">Logout</div>
      </div>
    )
  }
}
