import React, { Component } from 'react';
import Breadcrumb from './breadCrumb'; // Ensure you have the correct path for this import
import '../../../stylings/styles.css'; // Import your CSS file
import { useAppContext } from './AppContext';
import Cookies from "js-cookie";

class ResponsiveHeader extends Component {
  state = {
    sidebarVisible: true,
    openUp: false, // State for controlling the openUp class
    username: "",
    nameKey:"",
    messages:[],
    unseenMessages:0,
    siteUsers:[],
    gobdUsers:[],
    diagnoses:[],
  };

  componentDidMount() {
    this.fetchData();
    this.fetchMessages();
    this.fetchDiagnoses();
  }

  toggleSidebarClass = () => {
    this.setState((prevState) => ({ openUp: !prevState.openUp }));
  };

  fetchData = async () => {
    var gobdArr = []
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
        // console.log(adminData);
        this.setState({ username: adminData.username || "Admin" }); // Assuming adminData contains username
        const usersData = await this.fetchAllUsersData();
        // console.log(usersData)
        if(usersData.message !== "no users"){
           usersData.map((item, i)=>{
          if(item.seen !== "SEEN"){
            gobdArr.push(item)
          }
          return gobdArr
      })
      this.setState({gobdUsers: gobdArr})
        }else{
          this.setState({gobdUsers: []})
        }
       
        this.setState({nameKey: this.formatName(this.state.username)})
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  logout = async() => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/logoutadmin`, {
        method: "GET",
        credentials: "include"
      });
      const res = await response.json();
      // console.log(res)
      res.status=="success"?window.location.href = "/login":'';
    }catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  fetchDiagnoses = async () => {
    var unseenDiagnosesArr = []
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
        // console.log(adminData);
        this.setState({ username: adminData.username || "Admin" }); // Assuming adminData contains username
       const allDiagnoses = await this.fetchAllDiagnoses();
        // console.log(allDiagnoses)
        if(allDiagnoses.message !== "no car_issues"){
           allDiagnoses.map((item, i)=>{
          if(item.seen !== "SEEN"){
            unseenDiagnosesArr.push(item)
          }
          return unseenDiagnosesArr
      })
      this.setState({diagnoses: unseenDiagnosesArr})
        }else{
          this.setState({diagnoses: []})
        }
       
        this.setState({nameKey: this.formatName(this.state.username)})
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


   fetchMessages = async () => {
    var unseenArr = []
    var unseenArrUsers = []
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL_2}/fetchAllMessages`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Failed to fetch messages');

      const data = await response.json();
      const separatedData = separateByMyId(data.result);
      // console.log(separatedData)
      separatedData.map((item, i)=>{
        item.map((obj, index)=>{
          if(obj.myId !=="admin" && obj.seen_by_admin !== "SEEN"){
            unseenArr.push(obj)
          }
          return unseenArr
        })
        return unseenArr
      })
      // console.log(separateByMyId(unseenArr))
      this.setState({unseenMessages: separateByMyId(unseenArr).length})

      // console.log(this.state.unseenMessages)

      // console.log(separatedData);bb===
      // this.setState(() => ({ messages: separat edData }));
      
      // // setMessages(separatedData);
      // console.log(this.state.messages)
      const fetchSiteUsers = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL_2}/users`, {
            method: "GET",
            credentials: "include"
          });
          return await response.json() || [];
        } catch (error) {
          console.error('Error fetching users data:', error);
          return [];
        }
      };
      const allSiteUsers = await fetchSiteUsers()
      allSiteUsers.map((item, i)=>{
          if(item.seen !== "SEEN"){
            unseenArrUsers.push(item)
          }
          return unseenArrUsers
      })
      this.setState({siteUsers: unseenArrUsers})
      
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  fetchAllDiagnoses = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/getAllDiagnostics`, {
        method: "GET",
        credentials: "include"
      });
      return await response.json() || [];
    } catch (error) {
      console.error('Error fetching users data:', error);
      return [];
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
              <li className='messages'><a href="/individuals">GOBD Users</a>
              {this.state.gobdUsers.length !==0 || null? <span>{this.state.gobdUsers.length}</span>: ""}</li>
              <li className='messages'><a href="/individuals_ChatUsers">Site users</a>
             {this.state.siteUsers.length !==0 || null? <span>{this.state.siteUsers.length}</span>: ""}
             </li>
              <li className='messages'><a href="/car_diagnoses">Car Diagnoses</a>
             {this.state.diagnoses.length !==0 || null? <span>{this.state.diagnoses.length}</span>: ""}
             </li>
              <li className='messages'><a href="/messages">Messages</a>
              {this.state.unseenMessages !== 0 || null? <span>{this.state.unseenMessages}</span>: ""}
              </li>
              {/* <li><a href="/support">Support</a></li> */}
            </ul>
            <div className="header-search">
              <input type="text" placeholder="Search..." />
            </div>
            <div className="logout" onClick={this.logout}><i className="bi bi-box-arrow-right"></i> Logout</div>
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


function separateByMyId(arr) {
  const result = {};

  arr.forEach(item => {
    const { myId, otherId } = item;

    // Create a key that considers both myId and otherId
    const key = [myId, otherId].sort().join('-');

    // Initialize an array for this key if it doesn't exist
    if (!result[key]) {
      result[key] = [];
    }

    // Push the current item into the appropriate array
    result[key].push(item);
  });

  // Convert the result object into an array of arrays
  return Object.values(result);
}

export default DashboardWithContext;
