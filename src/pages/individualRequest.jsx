import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure to import useNavigate
import ResponsiveHeader from './tools/responsiveHeader';

const IndividualRequest = () => {
  const [data, setData] = useState(null); // State for data
  const [sidebarVisible, setSidebarVisible] = useState(true); // Sidebar visibility
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/verifyAdmin`, {
        method: "GET",
        credentials: "include",
      });
      const adminData = await response.json();

      if (!adminData || (adminData && adminData.message === "Please log in again.")) {
        navigate("/login");
        setData(null); // Clear data if not logged in
        return;
      } else { 
        // console.log(adminData);
        // Fetch additional data if logged in
        const usersData = await fetchAllUsersData();
        const paymentsData = await fetchAllPaymentsData();
        setData({ users: usersData, payments: paymentsData, adminData: adminData });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <ResponsiveHeader />
      {/* Uncomment these if needed */}
      {/* <HeaderMore />
      <Sidebar visible={sidebarVisible} /> */}
      <div className="container">
        <div className="containerRequest">
          <div className="head">
            <h2>#Request - 001</h2>
          </div>
          <div className="others">
            <div className="left">
              <table>
                <thead>
                  <tr>
                    <th>Request id</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Customer name</td>
                    <td>val2</td>
                  </tr>
                  <tr>
                    <td>Date requested</td>
                    <td>val2</td>
                  </tr>
                  <tr>
                    <td>Date completed</td>
                    <td>val2</td>
                  </tr>
                </tbody>
              </table>
              <div className="requestSummary">
                <div>Request:</div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam recusandae eius eveniet temporibus magni nemo iste consequuntur consectetur. Suscipit reprehenderit illum molestiae maiores quod asperiores hic amet repellendus recusandae quae?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum veritatis nam omnis iste esse eligendi dolorum iusto ea neque sequi, provident vitae voluptatem! Fugit blanditiis consequuntur tempora minima a exercitationem!
                </p>
              </div>
            </div>
            <div className="right">
              <div className="requestIntro">
                <div className="img"><img src="vite.svg" alt="" /></div>
                <div className="name">name</div>
                <div className="role">role</div>
                <div className="number">number</div>
                <div className="number">star ratings</div>
              </div>
              <div className="requestOther">
                {[...Array(4)].map((_, index) => (
                  <div className="indiv" key={index}>
                    <div className="title">Title</div>
                    <div className="subTitle">subTitle</div>
                  </div>
                ))}
              </div>
              <div className="reviews">
                <div className='revHead'>Reviews</div>
                {[...Array(4)].map((_, index) => (
                  <div className="indiv" key={index}>
                    <div className="review">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores sequi aperiam placeat, amet perspiciatis sit. Vitae fugit excepturi maiores eum est. Eius, a! Facilis ut et quaerat, sit ipsum aliquid.</div>
                    <div className="author">- Mark</div>
                  </div>
                ))}
              </div>
            </div>
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
      credentials: "include",
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
      credentials: "include",
    });
    return await response.json() || [];
  } catch (error) {
    console.error('Error fetching payments data:', error);
    return [];
  }
};

export default IndividualRequest;
