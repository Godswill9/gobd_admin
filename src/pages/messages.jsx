import React, { Component } from 'react'
import Header from './tools/header'
import Sidebar from './tools/sidebar'
import ResponsiveHeader from './tools/responsiveHeader';

export default class Messages extends Component {
  state = {
    sidebarVisible: true,
    messages: [],
    newMessage: '',
    userId: 'yourUserId', // Replace with actual user ID
    otherId: null, // Replace with the ID of the other user
    data:{},
    messagesMain: [],
  };

  componentDidMount() {
    this.fetchData();
    this.fetchMessages();
  }

fetchData = async () => {
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
      this.setState({ data:adminData, userId:adminData.id});
      // setLoginStatus(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  fetchMessages = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL_2}/fetchAllMessages`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ myId: this.state.userId, friend: this.state.otherId }),
      });

      if (!response.ok) throw new Error('Failed to fetch messages');

      const data = await response.json();
      // console.log(data.result)
      const separatedData = separateByMyId(data.result);
      // console.log(separatedData);
      this.setState({ messages: separatedData });
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  handleSendMessage = async () => {
    const { newMessage, userId, otherId } = this.state;
    const time = new Date().toISOString().slice(0, 19).replace('T', ' '); // Use ISO format for datetime

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL_2}/sendMessageAdmin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: newMessage, id: userId, otherId, time }),
      });

      if (!response.ok) throw new Error('Failed to send message');

      await this.fetchMessages(); // Refresh messages after sending
      this.setState({ newMessage: '' }); // Clear input field
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  handleClick = async (id) => {
    // myId, friend
    // console.log(id)
    const time = new Date().toISOString(); // Use ISO format for datetime

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL_2}/fetchMessages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({myId:id, friend:"admin"}),
      });

      if (!response.ok) throw new Error('Failed to send message');
      const data = await response.json();
      console.log(data)
      console.log(this.state.messages)
      this.setState({messagesMain:data, otherId:data[0].myId})
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  render() {
    const { messages, newMessage } = this.state;
    return (
      <div>
         <ResponsiveHeader/>
        {/* <Header/>
        <Sidebar visible={this.state.sidebarVisible} /> */}
        <div className="container">
      <div className="containerMessages">
        <div className="headerSection">
          <div className="dm active">DM's</div>
          <div className="notifications">Notifications</div>
        </div>
        <div className="messageSection">
    <div className="messageList">
      <div className="details">
      {
  messages.map((item, i) => {
    return (
      <div className="indiv" onClick={() => this.handleClick(item[0].myId, item[0].otherId)} key={i}>
        <div className="image">
          <img src="vite.svg" alt="" />
        </div>
        <div className="other">
          <div className="name">{item[0].id}</div>
          <div className="messageDetails">{item[0].message}</div>
        </div>
      </div>
    );
  })
}

      </div>
    </div>
    <div className="chatSection">
      <div className="chatCont">
        <div className="messageSection">
          {
            this.state.messagesMain.map((item, i)=>{
              return(
                <div className="sender">
                <div className="senderInner">
                  <img src="" alt="" />
                  <div className="message">{item.message[0]}</div>
                </div>
              </div>
              )
            })
          }
          {/* <div className="sender">
            <div className="senderInner">
              <img src="" alt="" />
              <div className="message">HI</div>
            </div>
          </div>
          <div className="sender">
            <div className="senderInner">
              <img src="" alt="" />
              <div className="message">good, and you</div>
            </div>
          </div>
          <div className="reciever">
            <div className="recieverInner">
              <img src="" alt="" />
              <div className="message">How are you doing</div>
            </div>
          </div>
          <div className="reciever">
            <div className="recieverInner">
              <img src="" alt="" />
              <div className="message">How are you doing</div>
            </div>
          </div>
          <div className="reciever">
            <div className="recieverInner">
              <img src="" alt="" />
              <div className="message">How are you doing</div>
            </div>
          </div>
          <div className="reciever">
            <div className="recieverInner">
              <img src="" alt="" />
              <div className="message">How are you doing</div>
            </div>
          </div>
          <div className="reciever">
            <div className="recieverInner">
              <img src="" alt="" />
              <div className="message">How are you doing</div>
            </div>
          </div>
          <div className="reciever">
            <div className="recieverInner">
              <img src="" alt="" />
              <div className="message">How are you doing</div>
            </div>
          </div>
          <div className="sender">
            <div className="senderInner">
              <img src="" alt="" />
              <div className="message">good, and you</div>
            </div>
          </div> */}
          {/* <div className="sender">
            <div className="senderInner">
              <img src="" alt="" />
              <div className="message">good, and you</div>
            </div>
          </div> */}
        </div>
      </div>
      <div className="inputSection">
        <div id="file">@</div>
        <input type="text"  value={newMessage} id="text" placeholder='Send a message...'  onChange={(e) => this.setState({ newMessage: e.target.value })}/>
        <button onClick={this.handleSendMessage}>Send</button>
      </div>
    </div>
    <div className="chatDetails">
      <div className="userIntro">
        <div className="img"> <img src="vite.svg" alt="" /></div>
        <div className="name">{this.state.otherId}</div>
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
    )
  }
}


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
