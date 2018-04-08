import R from 'ramda'
import { addToDeviceShadow, removeFromDeviceShadow, getIoTDeviceToken } from './iot'

// curl -X PUT -H "Authorization: Bearer SECRET" -H "Content-Type: application/json" -d "[\"PAYMENT_UPDATED\"]" https://connect.squareup.com/v1/LOCATION/webhooks
// TODO: List payments failover
// TODO: Add HMAC signing for security
const isValidRequest = event => {
  return true;
}

const fetchSquare = async endpoint => fetch(`https://connect.squareup.com/v1/${process.env.LOCATION_ID}${endpoint}`, {
  headers: {
    Authorization: `Bearer ${process.env.SQUARE_SECRET}`
  }
}).then(r => r.json())

const getPaymentById = async paymentId => fetchSquare(`/payments/${paymentId}`)

const wasOrderRefunded = o => o.refunded_money.amount < 0
const generatePayloadFromSquareOrder = order => {
  const processItems = R.pipe(
    R.filter(i => i.itemization_type === "ITEM"),
    R.map(R.pipe(
      R.pick([
        'name',
        'item_variation_name',
        'quantity',
        'modifiers',
        'notes'
      ]),
      R.evolve({
        quantity: parseInt,
        modifiers: R.pluck('name')
      })
    ))
  )
  
  return {
    id: order.id,
    type: 'ORDER',
    created_at: order.created_at,
    items: processItems(order.itemizations)
  }
}

export const handleWebhooks = async (event, context, callback) => {
  const { entity_id: id, location_id: locationId, event_type: eventType } = JSON.parse(event.body)

  // If not from Square OR not for the Tabuleh Cafe, drop it.
  if (locationId !== process.env.LOCATION_ID || !isValidRequest())
    return callback(null, { status: false, message: 'Invalid Request' })

  if (eventType === 'PAYMENT_UPDATED') {
    const squareOrder = await getPaymentById(id)

    if (wasOrderRefunded(squareOrder)) {
      removeFromDeviceShadow(squareOrder.id)
    } else {
      addToDeviceShadow(generatePayloadFromSquareOrder(squareOrder))
    }
  } else {
    return callback(null, { status: false, message: 'Unhandled Event Type' })
  }
}

export const auth = (event, context, callback) => {
  try {
    getIoTDeviceToken().then(b => callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(b)
    }));
  } catch (e) {
    callback(e)
  }
};
