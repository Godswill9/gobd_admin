import React, { Component } from 'react';
import Breadcrumb from './breadCrumb'; // Ensure you have the correct path for this import
import '../../../stylings/styles.css'; // Import your CSS file
import { useAppContext } from './AppContext';

class ResponsiveHeader extends Component {
  state = {
    sidebarVisible: true,
    openUp: false, // State for controlling the openUp class
    username: "",
    nameKey:""
  };

  componentDidMount() {
    this.fetchData();
  }

  toggleSidebarClass = () => {
    this.setState((prevState) => ({ openUp: !prevState.openUp }));
  };

  fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/verifyAdmin`, {
        method: "GET",
        credentials: "include"
      });
      const adminData = await response.json();

      if (!adminData || (adminData && adminData.message === "Please log in again.")) {
        // navigate("/login");
        this.setState({ username: "Admin" }); // Assuming adminData contains username
        // const usersData = await this.fetchAllUsersData();
        // this.setState({nameKey: this.formatName(this.state.username)})
        return;
      } else {
        console.log(adminData);
        this.setState({ username: adminData.username || "Admin" }); // Assuming adminData contains username
        const usersData = await this.fetchAllUsersData();
        this.setState({nameKey: this.formatName(this.state.username)})
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchAllUsersData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/getAllUsers`, {
        method: "GET",
        credentials: "include"
      });
      return await response.json() || [];
    } catch (error) {
      console.error('Error fetching users data:', error);
      return [];
    }
  };

  formatName=(str)=>{
    var strArr = str.split("")
     return strArr[0]+ strArr[1]
  }

  render() {
    const breadcrumbPath = ['Home', 'RQ-001'];
    const activeIndex = 1;

    return (
      <header className="header">
        <div className="res">
          <div className="open" onClick={this.toggleSidebarClass}>
            <i className="bi bi-layout-text-sidebar"></i>
          </div>
          <div className="header-search">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="header-right">
            <div className="notification-icon">
              <span role="img" aria-label="notifications"><i className="bi bi-bell"></i></span>
            </div>
            <div className="admin-data">
              <div className="left">{(this.state.nameKey.toUpperCase())}</div>
              <div className="right">
                <span className='name'>{this.state.username}</span>
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
              <li><a href="/dashboard">Dashboard</a></li>
              <li><a href="/individuals">Individuals</a></li>
              <li><a href="/messages">Messages</a></li>
              {/* <li><a href="/support">Support</a></li> */}
            </ul>
            <div className="header-search">
              <input type="text" placeholder="Search..." />
            </div>
            <div className="logout"><i className="bi bi-box-arrow-right"></i> Logout</div>
            <div className="close" onClick={this.toggleSidebarClass}><i className="bi bi-x-lg"></i></div>
          </div>
        )}
      </header>
    );
  }
}

// Create a wrapper component to inject context and navigation
const DashboardWithContext = () => {
  const { fetchData, data, loginStatus } = useAppContext();

  return <ResponsiveHeader fetchData={fetchData} data={data} loginStatus={loginStatus} />;
};

export default DashboardWithContext;
