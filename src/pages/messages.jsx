import React, { useState, useEffect } from 'react';
import Header from './tools/header';
import Sidebar from './tools/sidebar';
import ResponsiveHeader from './tools/responsiveHeader';

const Messages = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userId, setUserId] = useState('yourUserId'); // Replace with actual user ID
  const [otherId, setOtherId] = useState(null); // Replace with the ID of the other user
  const [data, setData] = useState({});
  const [customers, setCustomers] = useState([]);
  const [messagesMain, setMessagesMain] = useState([]);

  useEffect(() => {
    fetchData();
    fetchMessages();
  }, []);

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
        setData(adminData);
        setUserId(adminData.id);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL_2}/fetchAllMessages`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Failed to fetch messages');

      const data = await response.json();
      const separatedData = separateByMyId(data.result);
      console.log(separatedData);
      setMessages(separatedData);

      // Fetch additional data for each message
      const customers = await Promise.all(
        separatedData.map((item) => fetchMessagesMore(item[0].myId))
      );
      setCustomers(customers);
      console.log(customers);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchMessagesMore = async (myId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL_2}/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: myId, myId: "admin" }),
      });

      if (!response.ok) throw new Error('Failed to fetch user data');

      const data = await response.json();
      console.log(data);
      localStorage.setItem("customerName", data.user.username);

      const allMessages = messages;
      const val = allMessages.find((item) => item[0].myId === myId);

      val.sort((a, b) => new Date(a.timeReceived) - new Date(b.timeReceived));
      setMessagesMain(val);
      setOtherId(myId);

      console.log(val)

      return { userName: data.user.username, userPhone: data.user.phone };
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null; // Return null or a default value in case of an error
    }
  };

  const handleSendMessage = async () => {
    const time = new Date().toISOString().slice(0, 19).replace('T', ' '); // Use ISO format for datetime

    if (!newMessage.trim()) {
      console.log("Please enter a message");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL_2}/sendMessageAdmin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: newMessage, id: userId, otherId, time }),
      });

      if (!response.ok) throw new Error('Failed to send message');

      setNewMessage(''); // Clear input field
      await fetchMessages(); // Refresh messages after sending
      // handleClick(otherId);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleClick = async (id) => {
    console.log(id);
    setOtherId(id);
    const time = new Date().toISOString(); // Use ISO format for datetime

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL_2}/fetchMessages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ myId: id, friend: "admin" }),
      });

      if (!response.ok) throw new Error('Failed to fetch messages');

      const allMessages = messages;
      const val = allMessages.find((item) => item[0].myId === id);

      val.sort((a, b) => new Date(a.timeReceived) - new Date(b.timeReceived));
      setMessagesMain(val);
      setOtherId(id);
      await fetchMessages(); // Refresh messages after sending
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <ResponsiveHeader />
      <div className="container">
        <div className="containerMessages">
          <div className="headerSection">
            <div className="dm active">DM's</div>
            <div className="notifications">Notifications</div>
          </div>
          <div className="messageSection">
            <div className="messageList">
              <div className="details">
                {messages.map((item, i) => (
                  <div className="indiv" onClick={() => handleClick(item[0].myId === "admin" ? item[0].otherId : item[0].myId)} key={i}>
                    <div className="image">
                      <img src="vite.svg" alt="" />
                    </div>
                    <div className="other">
                      <div className="name">{customers[i]?.userName}</div>
                      <div className="messageDetails">{item[0].message}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="chatSection">
              <div className="chatCont">
                <div className="messageSection">
                  {messagesMain
                    .sort((a, b) => new Date(a.timeReceived) - new Date(b.timeReceived))
                    .map((item, i) => (
                      <div className={item.otherId === "admin" ? "reciever" : "sender"} key={i}>
                        <div className={item.otherId === "admin" ? "recieverInner" : "senderInner"}>
                          <img src="" alt="" />
                          <div className="message">{item.message}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="inputSection">
                <div id="file">@</div>
                <input type="text" value={newMessage} id="text" placeholder='Send a message...' onChange={(e) => setNewMessage(e.target.value)} />
                <button onClick={handleSendMessage}>Send</button>
              </div>
            </div>
            <div className="chatDetails">
              <div className="userIntro">
                <div className="img"> <img src="vite.svg" alt="" /></div>
                <div className="name">{localStorage.getItem("customerName")}</div>
                <div className="role">role</div>
                <div className="number">number</div>
              </div>
              <div className="userOther">
                <div className="indiv">
                  <div className="title">Title</div>
                  <div className="subTitle">subTitle</div>
                </div>
                <div className="indiv">
                  <div className="title">Title</div>
                  <div className="subTitle">subTitle</div>
                </div>
                <div className="indiv">
                  <div className="title">Title</div>
                  <div className="subTitle">subTitle</div>
                </div>
                <div className="indiv">
                  <div className="title">Title</div>
                  <div className="subTitle">subTitle</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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

export default Messages;
