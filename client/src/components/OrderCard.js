import React from 'react';
import { markOrderCompleteAC } from '../actions/orders'
import { connect } from 'react-redux';

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

const mapStateToProps = (state, originalProps) => ({
  originalProps
})

const mapDispatchToProps = (dispatch) => ({
  markOrderComplete: (id) => dispatch(markOrderCompleteAC(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderCard);
