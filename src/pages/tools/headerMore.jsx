import React, { Component } from 'react';
import '../../../stylings/styles.css'; // Import the CSS file
import Breadcrumb from './breadCrumb';

export default class HeaderMore extends Component {
  render() {
    const breadcrumbPath = ['Home', 'RQ-001'];
    const activeIndex = 1; // Set the index of the active breadcrumb (0 for 'Home', 1 for 'Rice')

    return (
      <header className="header">
        <Breadcrumb path={breadcrumbPath} activeIndex={activeIndex} />
        <div className="header-search">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="header-right">
          <div className="notification-icon">
            <span role="img" aria-label="notifications">🔔</span>
          </div>
          <div className="admin-data">
            <div className="left">AC</div>
            <div className="right"> 
              <span className='name'>Admin Adeola</span>
              <span>Admin</span>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
