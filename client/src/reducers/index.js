import { OrderActionNames } from '../actions/orders'
import * as R from 'ramda'


const defaultState = {
  online: [],
  pickup: [],
  inStore: []
}

const orderReducer = (state = defaultState, action) => {
  switch(action.type) {
    case OrderActionNames.ReceivedOrdersCompleteSuccess: {
      const orders = Object.values(action.orders)

      // TODO: Get distinction of order source/going
      return Object.assign({}, state, {
        inStore: orders,
        pickup: orders,
        online: orders
      })
    }
    case OrderActionNames.MarkOrderCompleteInit: {
      const removeId = R.compose(R.reject((order) => (order.id === action.orderId)), R.clone)
      
      return Object.assign({}, state, {
        inStore: removeId(state.inStore),
        pickup: removeId(state.pickup),
        online: removeId(state.online)
      })
    }
    default: {
      return state;
    }
  }
}

export default orderReducer;
