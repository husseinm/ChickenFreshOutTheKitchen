import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class CurrentOrders extends React.Component {
  render() {
    return (
      <section style={{textAlign:"center"}}>        
        <h1>Order Details</h1>
      </section>
    );
  }
}

ReactDOM.render(
  <CurrentOrders />,
  document.getElementById('root')
);