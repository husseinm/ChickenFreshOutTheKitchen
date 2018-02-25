import React from 'react';
import { connect } from 'react-redux';

import OrderCards from './components/OrderCards';
import './App.css';

const App = ({
  addOrder,
  onlineOrders,
  instoreOrders,
  pickupOrders
}) => (
  <div className="App">
    <header className="App-header">
      <h1 className="App-title"><em>Chicken Fresh Out The Kitchen</em></h1>
    </header>

    <div className="sub-title">
      <div className="container">
        <div className="row sections">
          <div className="col-sm col1 rounded">
            <h4>Online</h4>
            <div className="container">
              <div className="row sub-sections">
                <div className="col-xs orders">
                  <OrderCards orders={onlineOrders} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm col2 rounded">
            <h4>In-store</h4>
            <div className="container">
              <div className="row sub-sections">
                <div className="col-xs orders">
                  <OrderCards orders={instoreOrders} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm col3 rounded">
            <h4>Pickup</h4>
            <div className="container">
              <div className="row sub-sections">
                <div className="col-xs orders">
                  <OrderCards orders={pickupOrders} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const mapStateToProps = (state, originalProps) => ({
  onlineOrders: state.online,
  instoreOrders: state.inStore,
  pickupOrders: state.pickup,
  originalProps
})

export default connect(mapStateToProps, {})(App);