import React, { Component } from 'react';
import { connect } from 'react-redux';
import awsIot from 'aws-iot-device-sdk';

import OrderCards from './components/OrderCards';
import './App.css';

class App extends Component {
  componentDidMount() {
    let client, iotTopic;
    const IoT = {
      connect: (topic, iotEndpoint, region, accessKey, secretKey, sessionToken) => {
        iotTopic = topic;

        // connect
        client = awsIot.device({
          region: region,
          protocol: 'wss',
          accessKeyId: accessKey,
          secretKey: secretKey,
          sessionToken: sessionToken,
          port: 443,
          host: iotEndpoint
        });

        client.on('connect', () => { client.subcribe(iotTopic) });
        client.on('message', console.log);
        client.on('close', () => console.log('Connection Failed'));
      },

      send: (message) => {
        client.publish(iotTopic, message); // send messages
      }
    };
  }

  render() {
    const {
      addOrder,
      onlineOrders,
      instoreOrders,
      pickupOrders
    } = this.props;

    return (
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
  }
}

const mapStateToProps = (state, originalProps) => ({
  onlineOrders: state.online,
  instoreOrders: state.inStore,
  pickupOrders: state.pickup,
  originalProps
})

export default connect(mapStateToProps, {})(App);
