import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Make sure to import useNavigate
import ResponsiveHeader from './tools/responsiveHeader';
import { useAppContext } from '../pages/tools/AppContext';
import Chart from './tools/chart';

const Dashboard = () => {
  // const { fetchData, data } = useAppContext();
  const navigate = useNavigate();
  const [data, setData]=useState({
    users:[]
  })

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/verifyAdmin`, {
        method: "GET",
        credentials: "include"
      });
      const adminData = await response.json();

      if (!adminData || (adminData && adminData.message === "Please log in again.")) {
       navigate("/login")
        setData(null); // Clear data if not logged in
        return;
      } else{ 
        console.log(adminData)
          // // Fetch additional data if logged in
      const usersData = await fetchAllUsersData();
      const paymentsData = await fetchAllPaymentsData();
      setData({ users: usersData, payments: paymentsData, adminData:adminData });
      // setLoginStatus(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(()=>{
    fetchData()
  },[])

  return (
    <div>
      <ResponsiveHeader />
      <div className="container">
        <div className="section1">
          <div className="head">
            <h2>Key metrics</h2>
          </div>
          <div className="metrics">
            <div className="value active">
              <div className="title">Total registered users</div>
              <span className='num'>{data?.users?.length}</span>
            </div>
            <div className="value">
              <div className="title">Pending Messages</div>
              <span className='num'>12</span>
            </div>
            <div className="value">
              <div className="title">Post orders processed</div>
              <span className='num'>120</span>
            </div>
          </div>
        </div>
        <div className="section2">
          <div className="chartsCont">
            <Chart />
            {/* Assuming Chart component is already defined */}
          </div>
          <div className="individualsCont">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Request received</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.users?.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.requestReceived}</td>
                    <td>{item.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="section3">
          <h2>Payments</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Request received</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.payments?.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.requestReceived}</td>
                  <td>{item.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Export the component directly since context is already handled inside
export default Dashboard;

const fetchAllUsersData = async () => {
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

const fetchAllPaymentsData = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/getPayments`, {
      method: "GET",
      credentials: "include"
    });
    return await response.json() || [];
  } catch (error) {
    console.error('Error fetching payments data:', error);
    return [];
  }
};
