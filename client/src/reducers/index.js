import { OrderActionNames } from '../actions/orders'
import * as R from 'ramda'


const defaultState = {
  online: [
    {
      id: "1234",
      title: "#4 Combo -Large",
      detailsList: "-Dr. Pepper"
    },
    {
      id: "12345",
      title: "#5 Combo -Large",
      detailsList: "-Chicken Sandiwch"
    },
    {
      id: "123456",
      title: "#6 Combo -Large",
      detailsList: "-Fries"
    }
  ],
  pickup: [
    {
      id: "1",
      title: "#4 Combo -Large",
      detailsList: "-Dr. Pepper"
    },
    {
      id: "2",
      title: "#5 Combo -Large",
      detailsList: "-Chicken Sandiwch"
    },
    {
      id: "3",
      title: "#6 Combo -Large",
      detailsList: "-Fries"
    }
  ],
  inStore: [
    {
      id: "666666",
      title: "#4 Combo -Large",
      detailsList: "-Dr. Pepper"
    },
  ]
}

const orderReducer = (state = defaultState, action) => {
  switch(action.type) {
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
