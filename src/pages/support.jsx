import React, { Component } from 'react'
import Header from './tools/header'
import Sidebar from './tools/sidebar'
import ResponsiveHeader from './tools/responsiveHeader';

export default class Support extends Component {
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
          <div className="containerSupport">
     <div className="head">Support</div>
     <div className="tableSection">
     <table>
                <thead>
                  <th>Ticket id</th>
                  <th>Subject</th>
                  <th>Client</th>
                  <th>Date </th>
                  <th className='action'>Priority</th>
                  <th className='action'>Action</th>
                </thead>
                <tbody>
                  <tr>
                      <td>val2</td>
                  <td>val2</td>
                  <td>val2</td>
                      <td>val2</td>
                      <td className='action'><span className="low">low</span></td>
                  <td className='action'>val2</td>
                  </tr>
                  <tr>
                      <td>val2</td>
                  <td>val2</td>
                  <td>val2</td>
                      <td>val2</td>
                      <td className='action'><span className="high">high</span></td>
                      <td className='action'>val2</td>
                  </tr>
                  <tr>
                      <td>val2</td>
                  <td>val2</td>
                  <td>val2</td>
                      <td>val2</td>
                      <td className='action'><span className="low">low</span></td>
                      <td className='action'>val2</td>
                  </tr>
                  <tr>
                      <td>val2</td>
                  <td>val2</td>
                  <td>val2</td>
                      <td>val2</td>
                      <td className='action'><span className="medium">medium</span></td>
                      <td className='action'>val2</td>
                  </tr>
                  <tr>
                      <td>val2</td>
                  <td>val2</td>
                  <td>val2</td>
                      <td>val2</td>
                      <td className='action'><span className="low">low</span></td>
                  <td className='action'>val2</td>
                  </tr>
                  <tr>
                      <td>val2</td>
                  <td>val2</td>
                  <td>val2</td>
                      <td>val2</td>
                      <td className='action'><span className="low">low</span></td>
                  <td className='action'>val2</td>
                  </tr>
                  <tr>
                      <td>val2</td>
                  <td>val2</td>
                  <td>val2</td>
                      <td>val2</td>
                      <td className='action'><span className="low">low</span></td>
                  <td className='action'>val2</td>
                  </tr>
                  <tr>
                      <td>val2</td>
                  <td>val2</td>
                  <td>val2</td>
                      <td>val2</td>
                      <td className='action'><span className="low">low</span></td>
                  <td className='action'>val2</td>
                  </tr>
                  <tr>
                      <td>val2</td>
                  <td>val2</td>
                  <td>val2</td>
                      <td>val2</td>
                      <td className='action'><span className="low">low</span></td>
                  <td className='action'>val2</td>
                  </tr>
                  <tr>
                      <td>val2</td>
                  <td>val2</td>
                  <td>val2</td>
                      <td>val2</td>
                      <td className='action'><span className="low">low</span></td>
                  <td className='action'>val2</td>
                  </tr>
                  <tr>
                      <td>val2</td>
                  <td>val2</td>
                  <td>val2</td>
                      <td>val2</td>
                      <td className='action'><span className="low">low</span></td>
                  <td className='action'>val2</td>
                  </tr>
                  <tr>
                      <td>val2</td>
                  <td>val2</td>
                  <td>val2</td>
                      <td>val2</td>
                      <td className='action'><span className="low">low</span></td>
                  <td className='action'>val2</td>
                  </tr>
                
                </tbody>
              </table>
     </div>
     </div>
   </div>
      </div>
    )
  }
}
