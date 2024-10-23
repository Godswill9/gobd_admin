import React, { Component } from 'react';
import Breadcrumb from './breadCrumb'; // Ensure you have the correct path for this import
import '../../../stylings/styles.css'; // Import your CSS file

export default class ResponsiveHeader extends Component {
  state = {
    sidebarVisible: true,
    openUp: false, // State for controlling the openUp class
  };

  toggleSidebarClass = () => {
    this.setState((prevState) => ({ openUp: !prevState.openUp }));
  };

  render() {
    const breadcrumbPath = ['Home', 'RQ-001'];
    const activeIndex = 1;

    return (
      <header className="header">
        <div className="res">
          <div className="open" onClick={this.toggleSidebarClass}>
          <i class="bi bi-layout-text-sidebar"></i>
          </div>
          <div className="header-search">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="header-right">
            <div className="notification-icon">
              <span role="img" aria-label="notifications"><i class="bi bi-bell"></i></span>
            </div>
            <div className="admin-data">
              <div className="left">AC</div>
              <div className="right">
                <span className='name'>Admin Adeola</span>
                <span>Admin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        {this.state.sidebarVisible && (
          <div className={`sideBar ${this.state.openUp ? 'openUp' : ''}`}>
            <div className="header-logo">
              <img src="image_asoroauto.webp" alt="Logo" /> {/* Replace with your logo */}
            </div>
            <ul>
              <li><a href="/">Dashboard</a></li>
              <li><a href="/individuals">Individuals</a></li>
              <li><a href="/messages">Messages</a></li>
              <li><a href="/support">Support</a></li>
            </ul>
            <div className="header-search">
            <input type="text" placeholder="Search..." />
          </div>
            <div className="logout"><i class="bi bi-box-arrow-right"></i> Logout</div>
            <div className="close" onClick={this.toggleSidebarClass}><i class="bi bi-x-lg"></i></div>
          </div>
        )}
      </header>
    );
  }
}
