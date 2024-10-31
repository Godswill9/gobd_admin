import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Make sure to import useNavigate
import ResponsiveHeader from './tools/responsiveHeader';
import { useAppContext } from '../pages/tools/AppContext';
import Chart from './tools/chart';
import Loader from './tools/loader';

const Dashboard = () => {
  // const { fetchData, data } = useAppContext();
  const navigate = useNavigate();
  const [data, setData]=useState({
    users:[]
  })
  const[payments, setPayments]=useState([])
  const[siteUsers, setSiteUSers]=useState([])
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true)
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
      const siteUsersData = await fetchSiteUsers()
      console.log(siteUsersData)
      setData({ users: usersData, payments: paymentsData, adminData:adminData });
      // setLoginStatus(true);
      setPayments(getPaymentChunk(usersData, paymentsData))
      setSiteUSers(siteUsersData)

      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }finally{
      setLoading(false)
    }
  };

  useEffect(()=>{
    fetchData()
  },[])

  return (
    <div>
      <ResponsiveHeader />
      <div className="container">
      {loading ? (
            <Loader/>
          ) : (
            <div>
              {/* Add any additional content you want to show when data is loaded */}
            </div>
          )}
        <div className="section1">
          <div className="head">
            <h2>Key metrics</h2>
          </div>
          <div className="metrics">
            <div className="value active">
              <div className="title">Total registered Chat users</div>
              <span className='num'>{siteUsers?.length || 0}</span>
            </div>
            <div className="value active_gobd">
              <div className="title">Total registered GOBD users</div>
              <span className='num'>{data?.users?.length || 0}</span>
            </div>
            {/* <div className="value">
              <div className="title">Pending Messages</div>
              <span className='num'>12</span>
            </div> */}
            {/* <div className="value">
              <div className="title">Post orders processed</div>
              <span className='num'>120</span>
            </div> */}
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
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
              {siteUsers && siteUsers.length > 0 ? (
  siteUsers.map((item, i) => (
    <tr key={i}>
      <td>{item.username}</td>
      <td>{item.email}</td>
      <td>{item.phone}</td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan={3} style={{ textAlign: 'center' }}>
      No users available
    </td>
  </tr>
)}
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
                <th>Amount</th>
                <th>Status</th>
                <th>Subscription Plan</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
            {payments && payments.length > 0 ? (
  payments.map((item, i) => (
    <tr key={i}>
      <td>{item.username}</td>
      <td>{item.payment.amount}</td>
      <td>{item.payment.payment_status}</td>
      <td>{item.payment.subscription_plan}</td>
      <td>{formatDate(item.payment.payment_date)}</td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan={5} style={{ textAlign: 'center' }}>
      No payments available
    </td>
  </tr>
)}
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


function getPaymentChunk(usersArray, paymentsArray) {
  // Extract user IDs from the users array
  if(usersArray.length > 0 && paymentsArray.length > 0 ){
     const userIds = usersArray.map(user => user.id);

  // Map through payments and find usernames for each payment
  const usernames = paymentsArray
    .filter(payment => userIds.includes(payment.user_id)) // Filter payments by user_id
    .map(payment => {
      const user = usersArray.find(user => user.id === payment.user_id);
      return user ? {...user, payment} : null; // Get the username or null if not found
    })
    // .filter(username => username); // Remove any null values

  return usernames;
  }else{
    console.log("no data")
  }
 
}

function formatDate(timestamp) {
  const date = new Date(timestamp);
  
  // Format options
  const options = {
    year: 'numeric',
    month: 'long', // Use 'short' for abbreviated month names
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // Use 12-hour format
    timeZone: 'Africa/Lagos', // Specify the time zone
  };

  return date.toLocaleString('en-NG', options); // Nigerian English locale
}