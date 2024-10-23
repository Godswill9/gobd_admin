import React, { Component } from 'react'
import Header from './tools/header'
import Sidebar from './tools/sidebar'
import ResponsiveHeader from './tools/responsiveHeader';

export default class Messages extends Component {
  state = {
    sidebarVisible: true, // Set initial visibility
  };
  
  render() {
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
        <div className="indiv">
          <div className="image">
            <img src="vite.svg" alt="" />
          </div>
          <div className="other">
            <div className="name">Ade Ciroma</div>
            <div className="messageDetails">messageDetails</div>
          </div>
        </div>
        <div className="indiv">
          <div className="image">
            <img src="vite.svg" alt="" />
          </div>
          <div className="other">
            <div className="name">Ade Ciroma</div>
            <div className="messageDetails">messageDetails</div>
          </div>
        </div>
        <div className="indiv">
          <div className="image">
            <img src="vite.svg" alt="" />
          </div>
          <div className="other">
            <div className="name">Ade Ciroma</div>
            <div className="messageDetails">messageDetails</div>
          </div>
        </div>
        <div className="indiv">
          <div className="image">
            <img src="vite.svg" alt="" />
          </div>
          <div className="other">
            <div className="name">Ade Ciroma</div>
            <div className="messageDetails">messageDetails</div>
          </div>
        </div>
        <div className="indiv">
          <div className="image">
            <img src="vite.svg" alt="" />
          </div>
          <div className="other">
            <div className="name">Ade Ciroma</div>
            <div className="messageDetails">messageDetails</div>
          </div>
        </div>
        <div className="indiv">
          <div className="image">
            <img src="vite.svg" alt="" />
          </div>
          <div className="other">
            <div className="name">Ade Ciroma</div>
            <div className="messageDetails">messageDetails</div>
          </div>
        </div>
        <div className="indiv">
          <div className="image">
            <img src="vite.svg" alt="" />
          </div>
          <div className="other">
            <div className="name">Ade Ciroma</div>
            <div className="messageDetails">messageDetails</div>
          </div>
        </div>
        <div className="indiv">
          <div className="image">
            <img src="vite.svg" alt="" />
          </div>
          <div className="other">
            <div className="name">Ade Ciroma</div>
            <div className="messageDetails">messageDetails</div>
          </div>
        </div>
        <div className="indiv">
          <div className="image">
            <img src="vite.svg" alt="" />
          </div>
          <div className="other">
            <div className="name">Ade Ciroma</div>
            <div className="messageDetails">messageDetails</div>
          </div>
        </div>
        <div className="indiv">
          <div className="image">
            <img src="vite.svg" alt="" />
          </div>
          <div className="other">
            <div className="name">Ade Ciroma</div>
            <div className="messageDetails">messageDetails</div>
          </div>
        </div>
        <div className="indiv">
          <div className="image">
            <img src="vite.svg" alt="" />
          </div>
          <div className="other">
            <div className="name">Ade Ciroma</div>
            <div className="messageDetails">messageDetails</div>
          </div>
        </div>
        <div className="indiv">
          <div className="image">
            <img src="vite.svg" alt="" />
          </div>
          <div className="other">
            <div className="name">Ade Ciroma</div>
            <div className="messageDetails">messageDetails</div>
          </div>
        </div>
      </div>
    </div>
    <div className="chatSection">
      <div className="chatCont">
        <div className="messageSection">
          <div className="sender">
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
          </div>
          <div className="sender">
            <div className="senderInner">
              <img src="" alt="" />
              <div className="message">good, and you</div>
            </div>
          </div>
        </div>
      </div>
      <div className="inputSection">
        <div id="file">@</div>
        <input type="text" name="" id="text" placeholder='Send a message...'/>
        <button>send</button>
      </div>
    </div>
    <div className="chatDetails">
      <div className="userIntro">
        <div className="img"> <img src="vite.svg" alt="" /></div>
        <div className="name">name</div>
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
