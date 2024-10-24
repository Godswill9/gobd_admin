import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loginStatus, setLoginStatus] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/verifyAdmin`, {
        method: "GET",
        credentials: "include"
      });
      const adminData = await response.json();

      if (!adminData || (adminData && adminData.message === "Please log in again.")) {
        setLoginStatus(false);
        setData(null); // Clear data if not logged in
        return;
      } 

      // Fetch additional data if logged in
      const usersData = await fetchAllUsersData();
      const paymentsData = await fetchAllPaymentsData();

      setData({ users: usersData, payments: paymentsData, adminData:adminData });
      setLoginStatus(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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

  return (
    <AppContext.Provider value={{ data, fetchData, loginStatus }}>
      {children}
    </AppContext.Provider>
  );
};
