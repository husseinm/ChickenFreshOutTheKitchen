import React from 'react';
import { markOrderCompleteAC } from '../actions/orders'
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Counter from './Counter'
/*
  Original Card component using Bootstrap
*/

/*
const OrderCard = ({ order, markOrderComplete }) => (
  <div className="card">
    <div className="card-block">
      <h5 className="card-title">{order.id}</h5>
      <h6 className="card-subtitle mb-2 text-muted">{order.title}</h6>
      <div className="card-text">
        <div className="Card">
          {order.detailsList}
        </div>
      </div>
      <button className="btn" onClick={() => markOrderComplete(order.id)}>Order Complete</button>
    </div>
  </div>
)
*/

const OrderCard = ({ order, markOrderComplete }) => (
  <MuiThemeProvider>
  <Card
    style={{
      margin: '0 auto',
      border: '2px solid #424242',
    }}>
    <CardHeader
      title={order.id}
      actAsExpander={true}
      showExpandableButton={true}
      >
    <Counter />

    </CardHeader>
    <CardTitle              
      title={
        order.items.map(function(item, i) {
          return <li key={i}>{item.name}</li>
        })        
      }
    />
    <CardText expandable={true}>
      {/* <p>{order.items.toString()}</p> */}
      <p>{
      order.items.map(function(item, i) {
          return <li key={i}>{item.modifiers.toString()}</li>
        })
      }</p>
    </CardText>
    <CardActions>
      <RaisedButton fullWidth={true} label="Order Complete" onClick={() => markOrderComplete(order)}/>
    </CardActions>
  </Card>
  </MuiThemeProvider>
);

const mapStateToProps = (state, originalProps) => ({
  originalProps
})

const mapDispatchToProps = (dispatch) => ({
  markOrderComplete: (id) => dispatch(markOrderCompleteAC(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderCard);
