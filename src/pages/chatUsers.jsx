import React, { useEffect, useState } from 'react';
import ResponsiveHeader from './tools/responsiveHeader';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from './tools/AppContext';
import Loader from './tools/loader';


export default function ChatUsers() {
    const navigate = useNavigate();
    const { data, setData } = useAppContext();
    const [ users, setUsers ] = useState();
    const [loading, setLoading] = useState(true);

      
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
          const usersData = await fetchSiteUsers();
        setUsers(usersData)

        usersData.forEach(async(item, i)=>{
            const response2 =  await fetch(`${import.meta.env.VITE_API_URL_2}/editChatUserSeen`, {
                method:"PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({userId:item.id}),   
              })
              if (!response2.ok) throw new Error('Failed to fetch messages');
            
              const data2 = await response2.json();
            
              console.log(data2)
            
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
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
              {users && users.length > 0 ? (
  users.map((item, i) => (
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
  