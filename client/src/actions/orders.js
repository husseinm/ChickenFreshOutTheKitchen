export const OrderActionNames = {
  MarkOrderCompleteInit: 'MARK_ORDER_COMPLETE_INIT',
  MarkOrderCompleteSucceeded: 'MARK_ORDER_COMPLETE_SUCCEEDED',
  MarkOrderCompleteFailed: 'MARK_ORDER_COMPLETE_FAILED'
}

export const markOrderCompleteAC = (orderId) => ({
  type: OrderActionNames.MarkOrderCompleteInit,
  orderId
})
