import React, { Component } from 'react'
import Header from './tools/header'
import Sidebar from './tools/sidebar'
import HeaderMore from './tools/headerMore'
import ResponsiveHeader from './tools/responsiveHeader';

export default class IndividualRequest extends Component {
  state = {
    sidebarVisible: true, // Set initial visibility
  };
  
  render() {
    return (
        <div>
           <ResponsiveHeader/>
         {/* <HeaderMore/>
         <Sidebar visible={this.state.sidebarVisible} /> */}
        <div className="container">
            <div className="containerRequest">
            <div className="head">
              <h2>#Request - 001</h2>
            </div>
          <div className="others">
            <div className="left">
            <table>
                <thead>
                  <th>Request id</th>
                  <th></th>
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
        <div className="img"> <img src="vite.svg" alt="" /></div>
        <div className="name">name</div>
        <div className="role">role</div>
        <div className="number">number</div>
        <div className="number">star ratings</div>
      </div>
      <div className="requestOther">
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
      <div className="reviews">
        <div className='revHead'>Reviews</div>
        <div className="indiv">
          <div className="review">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores sequi aperiam placeat, amet perspiciatis sit. Vitae fugit excepturi maiores eum est. Eius, a! Facilis ut et quaerat, sit ipsum aliquid.</div>
          <div className="author">- Mark</div>
        </div>
        <div className="indiv">
          <div className="review">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores sequi aperiam placeat, amet perspiciatis sit. Vitae fugit excepturi maiores eum est. Eius, a! Facilis ut et quaerat, sit ipsum aliquid.</div>
          <div className="author">- Mark</div>
        </div>
        <div className="indiv">
          <div className="review">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores sequi aperiam placeat, amet perspiciatis sit. Vitae fugit excepturi maiores eum est. Eius, a! Facilis ut et quaerat, sit ipsum aliquid.</div>
          <div className="author">- Mark</div>
        </div>
        <div className="indiv">
          <div className="review">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores sequi aperiam placeat, amet perspiciatis sit. Vitae fugit excepturi maiores eum est. Eius, a! Facilis ut et quaerat, sit ipsum aliquid.</div>
          <div className="author">- Mark</div>
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
