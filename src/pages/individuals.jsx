import React from 'react';
import Header from './tools/header';
import Sidebar from './tools/sidebar';
import { Navigate, useNavigate } from 'react-router-dom';
import ResponsiveHeader from './tools/responsiveHeader';

class Individuals extends React.Component {
  handleRowClick = (id) => {
    this.props.navigate(`/individualsRequest`);
  };
  state = {
    sidebarVisible: true, // Set initial visibility
  };
  

  render() {
    const data = [
      { id: 1, name: 'John Doe', address: '123 Main St', requests: 5, completed: 3 },
      { id: 2, name: 'Jane Smith', address: '456 Elm St', requests: 2, completed: 1 },
      { id: 3, name: 'Mike Johnson', address: '789 Oak St', requests: 3, completed: 2 },
      { id: 1, name: 'John Doe', address: '123 Main St', requests: 5, completed: 3 },
      { id: 2, name: 'Jane Smith', address: '456 Elm St', requests: 2, completed: 1 },
      { id: 3, name: 'Mike Johnson', address: '789 Oak St', requests: 3, completed: 2 },
      { id: 1, name: 'John Doe', address: '123 Main St', requests: 5, completed: 3 },
      { id: 2, name: 'Jane Smith', address: '456 Elm St', requests: 2, completed: 1 },
      { id: 3, name: 'Mike Johnson', address: '789 Oak St', requests: 3, completed: 2 },
      { id: 1, name: 'John Doe', address: '123 Main St', requests: 5, completed: 3 },
      { id: 2, name: 'Jane Smith', address: '456 Elm St', requests: 2, completed: 1 },
      { id: 3, name: 'Mike Johnson', address: '789 Oak St', requests: 3, completed: 2 },
    ];

    return (
      <div>
         <ResponsiveHeader/>
        {/* <Header />
        <Sidebar visible={this.state.sidebarVisible} /> */}
        <div className="container">
          <div className="containerIndividuals">
            <div className="section1">
              <div className="head">
                <h2>Key metrics</h2>
              </div>
              <div className="metrics">
                {/* Metrics code here */}
              </div>
            </div>
            <div className="tableSection">
              <table>
                <thead>
                  <tr>
                    <th>Request id</th>
                    <th>Individual Name</th>
                    <th>Individual Address</th>
                    <th>No of requests</th>
                    <th>Completed requests</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id} onClick={() => this.handleRowClick(item.id)} style={{ cursor: 'pointer' }}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.address}</td>
                      <td>{item.requests}</td>
                      <td>{item.completed}</td>
                      <td>
                        ...
                        {/* <button onClick={(e) => { e.stopPropagation(); this.handleRowClick(item.id); }}>View</button> */}
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
  }
}

// Use a wrapper to pass navigate as a prop
const IndividualsWrapper = (props) => {
  const navigate = useNavigate();
  return <Individuals {...props} navigate={navigate} />;
};

export default IndividualsWrapper;
