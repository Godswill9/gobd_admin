import React, { useEffect, useState } from 'react';
import ResponsiveHeader from './tools/responsiveHeader';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from './tools/AppContext';
import Loader from './tools/loader';

const Individuals = () => {
  const navigate = useNavigate();
  const { data, setData } = useAppContext();
  const [ users, setUsers ] = useState();
  const [loading, setLoading] = useState(true);

  // const response2 =  await fetch(`${import.meta.env.VITE_API_URL_2}/messageSeenAdmin`, {
  //   method:"PUT",
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(obj),   
  // })
  // if (!response2.ok) throw new Error('Failed to fetch messages');

  // const data2 = await response2.json();

  // console.log(data2)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/verifyAdmin`, {
        method: "GET",
        credentials: "include"
      });
      const adminData = await response.json();

      if (!adminData || (adminData && adminData.message === "Please log in again.")) {
        navigate("/login");
        setData(null); // Clear data if not logged in
        return;
      } else {
        console.log(adminData);
        const usersData = await fetchAllUsersData();
        const paymentsData = await fetchAllPaymentsData();

        console.log(usersData)
        setUsers(usersData)

        usersData.forEach(async(item, i)=>{
          const response2 =  await fetch(`${import.meta.env.VITE_API_URL}/editGobdUserSeen`, {
              method:"PUT",
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({userId:item.id}),   
            })
            if (!response2.ok) throw new Error('Failed to fetch messages');
          
            const data2 = await response2.json();
          
      })

      console.log(usersData)
        // setData({ users: usersData, payments: paymentsData, adminData: adminData });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const handleRowClick = (id) => {
  //   navigate(`/individualsRequest`); // Pass the id to the route
  // };


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
        <div className="containerIndividuals">
          <div className="section1">
            <div className="head">
              <h2>Key metrics</h2>
            </div>
            <div className="metrics">
              {/* Add metrics here if needed */}
            </div>
          </div>
          <div className="tableSection">
            <table>
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Individual Name</th>
                  <th>Car Make</th>
                  <th>Car Year</th>
                  <th>Car Brand</th>
                  <th>Car Engine type</th>
                  <th>Phone</th>
                  <th>Subscription Status</th>
                  <th>Date registered</th>
                  {/* <th>Completed Requests</th>
                  <th>Actions</th> */}
                </tr>
              </thead>
              <tbody>
              {users && users.length > 0 ? (
  users
  .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  .map((item) => (
    <tr key={item.id} style={{ cursor: 'pointer' }}>
      <td>{item.id}</td>
      <td>{item.username}</td>
      <td>{item.car_make}</td>
      <td>{item.car_year}</td>
      <td>{item.car_model}</td>
      <td>{item.engine_type}</td>
      <td>{item.phone}</td>
      <td>{item.subscription_status}</td>
      <td>{formatDate(item.created_at)}</td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan={8} style={{ textAlign: 'center' }}>
      No users in database
    </td>
  </tr>
)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrapper component to handle context
const IndividualsWrapper = () => {
  const { data, setData } = useAppContext();
  return <Individuals data={data} setData={setData} />;
};

export default IndividualsWrapper;

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

function formatDate(input) {
  // Create a new Date object using the input string
  const date = new Date(input);

  // Get individual date components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // Format the date as "Day, Month Date, Year - HH:MM:SS"
  return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
}
