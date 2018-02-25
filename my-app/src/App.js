import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { addOrder } from './actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  addOrder() {
    this.props.addOrder(this.state.text);
  }

  renderOrders(){
    const { orders } = this.props;
    return(
        <div>
            {
              orders.map(order=>{
                return(
                  <div className="col-xs orders">
                    <div key={order.id} className="card">
                      <h6>Order Number#</h6>
                      <div>{order.text}</div>
                      <button className="btn">Order Complete</button>
                    </div>
                  </div>
                )
              })
            }
      </div>
    )

  }

  render() {
    return (
      <div className="order-view"
        className="App">
        <header className="App-header">
          <div className="form-inline">
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Add order"
                onChange={event => this.setState({text: event.target.value})}
              />
            </div>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => this.addOrder()}
              >
                Add Order
            </button>
          </div>
          <h1 className="App-title"><em>Chicken Fresh Out The Kitchen</em></h1>
        </header>
        <div className="sub-title">
          <div className="container">
            <div className="row sections">
              <div className="col-sm col1 rounded">
                <h4>Online</h4>
                <div className="container">
                  <div className="row sub-sections">
                      { this.renderOrders() }
                  </div>
                </div>
              </div>
              <div className="col-sm col2 rounded">
                <h4>In-store</h4>
                <div className="container">
                  <div className="row sub-sections">
                    <div className="col-xs orders">
                      <div className="card">
                        <div className="card-block">
                          <h6 className="card-title">#42332</h6>
                          <p className="card-subtitle mb-2 text-muted">#4 Combo -Large</p>
                          <p className="card-text">
                            -Dr. Pepper <br />-Chicken Sandiwch <br />-Fries
                          </p>
                        <button className="btn">Order Complete</button>
                        </div>
                      </div>
                    </div>
                    <div className="col-xs orders">
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm col3 rounded">
                <h4>Phone</h4>
                <div className="container">
                  <div className="row sub-sections">
                    <div className="col-xs orders">
                      <div className="card">
                        <div className="card-block">
                          <h6 className="card-title">#42332</h6>
                          <p className="card-subtitle mb-2 text-muted">#4 Combo -Large</p>
                          <p className="card-text">
                            -Dr. Pepper <br />-Chicken Sandiwch <br />-Fries
                          </p>
                        <button className="btn"
                          onClick>Order Complete</button>
                        </div>
                      </div>
                    </div>
                    <div className="col-xs orders">
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

function mapStateToProps(state){
  return {
    orders: state
  }
}

export default connect(mapStateToProps, { addOrder })(App);
