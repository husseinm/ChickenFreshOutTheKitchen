import { ADD_ORDER } from '../constants';

const order = (action) => {
  return {
    text: action.text,
    id: Math.random()
  }
}

const orders = (state = [], action) => {
  let orders = null;
  switch(action.type) {
    case ADD_ORDER:
      orders = [...state, order(action)]
      console.log('orders as state', orders);
      return orders;
    default:
      return state;
  }
}

export default orders;
