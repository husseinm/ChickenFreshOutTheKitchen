import React from 'react';
import { markOrderCompleteAC } from '../actions/orders'
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
  <Card>
    <CardHeader
      title={order.id}
    />
    <CardTitle title={order.title} />
    <CardText>
      {order.detailsList}
    </CardText>
    <CardActions>
      <RaisedButton label="Order Complete" onClick={() => markOrderComplete(order.id)}/>
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
