export const OrderActionNames = {
  MarkOrderCompleteInit: 'MARK_ORDER_COMPLETE_INIT',
  MarkOrderCompleteSucceeded: 'MARK_ORDER_COMPLETE_SUCCEEDED',
  MarkOrderCompleteFailed: 'MARK_ORDER_COMPLETE_FAILED',
  ReceivedOrdersCompleteSuccess: 'RECEIVED_ORDERS_COMPLETE_SUCCESS'
}

export const markOrderCompleteAC = (order) => ({
  type: OrderActionNames.MarkOrderCompleteInit,
  order
})

export const gotOrdersAC = (orders) => ({
  type: OrderActionNames.ReceivedOrdersCompleteSuccess,
  orders
})