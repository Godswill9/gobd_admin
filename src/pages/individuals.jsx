import React, { useEffect, useState } from 'react';
import ResponsiveHeader from './tools/responsiveHeader';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from './tools/AppContext';

const Individuals = () => {
  const navigate = useNavigate();
  const { data, setData } = useAppContext();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
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
        setData({ users: usersData, payments: paymentsData, adminData: adminData });
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

  const handleRowClick = (id) => {
    navigate(`/individualsRequest/${id}`); // Pass the id to the route
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading message while data is being fetched
  }

  const users = data?.users || []; // Use fetched data or an empty array
  console.log(data);

  return (
    <div>
      <ResponsiveHeader />
      <div className="container">
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
                  <th>No of Requests</th>
                  <th>Completed Requests</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((item) => (
                  <tr key={item.id} onClick={() => handleRowClick(item.id)} style={{ cursor: 'pointer' }}>
                    <td>{item.id}</td>
                    <td>{item.username}</td>
                    <td>{item.requests}</td>
                    <td>{item.completed}</td>
                    <td>
                      <button onClick={(e) => { e.stopPropagation(); handleRowClick(item.id); }}>View</button>
                    </td>
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
