import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { InitiateAppSocketAC } from './actions/app';

import OrderCards from './components/OrderCards';

import './App.css';

class App extends Component {
  /*******The Actual app******/
  componentDidMount() {
    this.props.connectToServer()
  }

  render() {
    const {
      addOrder,
      onlineOrders,
      instoreOrders,
      pickupOrders
    } = this.props;
    return (
      <MuiThemeProvider>
        <AppBar
          title="ChickenFreshOutTheKitchen"
          style={{ backgroundColor: '#212121' }}
        />

        <div className="App">
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

      </MuiThemeProvider>
    )
  }
  /*******A generic timer*******
  constructor (props) {
    super(props)
    this.state = {count: 1}
    clearInterval(this.timer)
    this.timer = setInterval(this.tick.bind(this), 1000)
  }
  tick () {
    this.setState({count: (this.state.count + 1)})
  }
  render () {
    return (
      <div >
        <h1>{this.state.count}</h1>
      </div>
    )
  }
  /****************************/
}

const mapDispatchToProps = (dispatch, originalProps) => ({
  connectToServer: () => dispatch(InitiateAppSocketAC())
})

const mapStateToProps = (state, originalProps) => ({
  onlineOrders: state.online,
  instoreOrders: state.inStore,
  pickupOrders: state.pickup,
  originalProps
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
