import React, { Component } from 'react'
import Header from './tools/header'
import Sidebar from './tools/sidebar'
import Chart from './tools/chart'
import ResponsiveHeader from './tools/responsiveHeader';

export default class Dashboard extends Component {
  state = {
    sidebarVisible: true, // Set initial visibility
  };

  render() {
    return (
      <div >
        <ResponsiveHeader/>
     <div className="container">
          <div className="section1">
            <div className="head">
              <h2>Key metrics</h2>
            </div>
            <div className="metrics">
              <div className="value active">
                <div className="title">Total mechanics registered</div>
                <span className='num'>120</span>
              </div>
              <div className="value">
                <div className="title">Pending service requests</div>
                <span className='num'>12</span>
              </div>
              <div className="value">
                <div className="title">Completed service requests</div>
                <span className='num'>120</span>
              </div>
              <div className="value">
                <div className="title">Post orders processed</div>
                <span className='num'>120</span>
              </div>
            </div>
          </div>
          <div className="section2">
            <div className="chartsCont">
              <Chart/>
            </div>
            <div className="individualsCont">
              <table>
                <thead>
                  <th>Name</th>
                  <th>Request recieved</th>
                  <th>Action</th>
                </thead>
                <tbody>
                  <tr>
                      <td>val2</td>
                  <td>val2</td>
                  <td>val2</td>
                  </tr>
                  <tr>
                      <td>val2</td>
                  <td>val2</td>
                  <td>val2</td>
                  </tr>
                  <tr>
                      <td>val2</td>
                  <td>val2</td>
                  <td>val2</td>
                  </tr>
                  <tr>
                      <td>val2</td>
                  <td>val2</td>
                  <td>val2</td>
                  </tr>
                  <tr>
                      <td>val2</td>
                  <td>val2</td>
                  <td>val2</td>
                  </tr>
                
                </tbody>
              </table>
            </div>
          </div>
          <div className="section3">
          <h2>Payments</h2>
          <table>
                <thead>
                  <th>Name</th>
                  <th>Request recieved</th>
                  <th>Action</th>
                  <th>Name</th>
                  <th>Request recieved</th>
                  <th>Action</th>
                </thead>
                <tbody>
                  <tr>
                      <td>val2</td>
                  <td>val2</td>
                  <td>val2</td>
                      <td>val2</td>
                  <td>val2</td>
                  <td>val2</td>
                  </tr>
                  <tr>
                      <td>val2</td>
                  <td>val2</td>
                  <td>val2</td>
                      <td>val2</td>
                  <td>val2</td>
                  <td>val2</td>
                  </tr>
                  <tr>
                      <td>val2</td>
                  <td>val2</td>
                  <td>val2</td>
                      <td>val2</td>
                  <td>val2</td>
                  <td>val2</td>
                  </tr>
                  <tr>
                      <td>val2</td>
                  <td>val2</td>
                  <td>val2</td>
                      <td>val2</td>
                  <td>val2</td>
                  <td>val2</td>
                  </tr>
                
                </tbody>
              </table>
          </div>
        </div>
      </div>
    )
  }
}