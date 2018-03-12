import React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import {GridList} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import OrderCards from './components/OrderCards';

/*
  Bootstrap UI implementation
*/

/*
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
*/

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'row wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
  },
};


const App = ({
  addOrder,
  onlineOrders,
  instoreOrders,
  pickupOrders
}) => (
  <MuiThemeProvider>
    <AppBar
    title="ChickenFreshOutTheKitchen"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
    />

    <div style={styles.root}>
      <GridList
        cellHeight={180}
        style={styles.gridList}
      >
        <Subheader>Online</Subheader>
        <OrderCards orders={onlineOrders} />
      </GridList>
    </div>


  </MuiThemeProvider>

)

const mapStateToProps = (state, originalProps) => ({
  onlineOrders: state.online,
  instoreOrders: state.inStore,
  pickupOrders: state.pickup,
  originalProps
})

export default connect(mapStateToProps, {})(App);
