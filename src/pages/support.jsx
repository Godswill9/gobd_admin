import React, { useEffect, useState } from 'react';
import Header from './tools/header';
import Sidebar from './tools/sidebar';
import ResponsiveHeader from './tools/responsiveHeader';

const Support = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState(null);
  const [usersData, setUsersData] = useState([]);
  const [paymentsData, setPaymentsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/verifyAdmin`, {
          method: "GET",
          credentials: "include"
        });
        const data = await response.json();

        if (!data || (data && data.message === "Please log in again.")) {
          // Redirect logic here, e.g., navigate("/login");
          return;
        } else {
          setAdminData(data);
          const usersData = await fetchAllUsersData();
          const paymentsData = await fetchAllPaymentsData();
          setUsersData(usersData);
          setPaymentsData(paymentsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or any loading component
  }

  return (
    <div>
      <ResponsiveHeader />
      {/* <Header />
      <Sidebar visible={sidebarVisible} /> */}
      <div className="container">
        <div className="containerSupport">
          <div className="head">Support</div>
          <div className="tableSection">
            <table>
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Subject</th>
                  <th>Client</th>
                  <th>Date</th>
                  <th className='action'>Priority</th>
                  <th className='action'>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Sample data, replace with dynamic data as needed */}
                {Array.from({ length: 10 }).map((_, index) => (
                  <tr key={index}>
                    <td>val2</td>
                    <td>val2</td>
                    <td>val2</td>
                    <td>val2</td>
                    <td className='action'><span className="low">low</span></td>
                    <td className='action'>val2</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Fetching all users data
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

// Fetching all payments data
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

export default Support;
