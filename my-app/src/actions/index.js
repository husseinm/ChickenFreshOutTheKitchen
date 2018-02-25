import { ADD_ORDER } from '../constants';

export const addOrder = (text) => {
  const action = {
    type: ADD_ORDER,
    text
  }
  console.log('action in addOrder', action);
  return action;
}
