import React, { useState } from 'react';
import '../../stylings/styles.css'; // Import your SCSS file
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import { useNavigate } from 'react-router-dom';
import Loader from './tools/loader';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const code = generateRandomString(13);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
      default:
        break;
    }
  };

  const handleSignup = async (url, successMessage, errorMessage) => {
    setLoading(true)
    const data = { username, email, password, phoneNumber, code };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });
  
      const res = await response.json();
      // console.log(res)
  
      if (res.status === 'success') {
        setLoading(false)
        toast.success(successMessage, {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
        });
        return true; // Indicates success
      } else if (res.message === 'Admin already exists') {
        setLoading(false)
        toast.success('Admin already exists... proceeding to login!', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
        });
        return false; // Indicates admin exists
      } else {
        setLoading(false)
        toast.error(res.message || errorMessage, {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
        });
        return false; // Indicates an error
      }
    } catch (error) {
      setLoading(false)
      console.error(error);
      toast.error('Error during signup!', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
      return false; // Indicates an error
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const isFirstSignupSuccessful = await handleSignup(
      `${import.meta.env.VITE_API_URL}/signupadmin`,
      'Signup success!',
      'Signup failed. Please try again.'
    );
  
    if (isFirstSignupSuccessful) {
      // Only call the second signup if the first was successful
      await handleSignup(
        `${import.meta.env.VITE_API_URL_2}/signup`,
        'Signup success!',
        'Signup failed. Please try again.'
      );
      
      setTimeout(() => {
        navigate('/verification');
      }, 1000);
    } else {
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    }
  };
  

  function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
    return randomString;
  }

  return (
    <>
      <ToastContainer />
      {loading ? (
            <Loader/>
          ) : (
            <div>
              {/* Add any additional content you want to show when data is loaded */}
            </div>
          )}
      <div className="signup-container">
        <div className="inner">
          <h2>Admin Signup</h2>
          {errorMessage && <div className="error">{errorMessage}</div>}
          {successMessage && <div className="success">{successMessage}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username:</label>
              <input type="text" name="username" value={username} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" name="email" value={email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input type="password" name="password" value={password} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Phone Number:</label>
              <input type="tel" name="phoneNumber" value={phoneNumber} onChange={handleChange} required />
            </div>
            <button type="submit">Sign Up</button>
          </form>
          <span><a href="/login">login</a> your account</span>
        </div>
      </div>
    </>
  );
};

export default Signup;
