import R from 'ramda'
import { addToDeviceShadow, removeFromDeviceShadow, getIoTDeviceToken } from './iot'
import { DynamoDB } from 'aws-sdk';
import moment from 'moment'
import axios from 'axios'

const dynamo = new DynamoDB({ region: 'us-east-1' })

// curl -X PUT -H "Authorization: Bearer SECRET" -H "Content-Type: application/json" -d "[\"PAYMENT_UPDATED\"]" https://connect.squareup.com/v1/LOCATION/webhooks
// TODO: List payments failover
// TODO: Add HMAC signing for security

// TODO:
// 1. Online being troublesome


const isValidRequest = event => {
  return true;
}

const fetchSquare = endpoint => axios(`https://connect.squareup.com/v1/${process.env.LOCATION_ID}${endpoint}`, {
  headers: {
    Authorization: `Bearer ${process.env.SQUARE_SECRET}`
  }
})

const getPaymentById = paymentId => fetchSquare(`/payments/${paymentId}`)

const wasOrderRefunded = o => o.refunded_money.amount > 0
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

const getAllFinishedOrders = () => new Promise((resolve, reject) => {
  dynamo.scan({
    TableName: 'chickenfreshoutthekitchen_finished_orders'
  }, (err, nextMeg) => {
    if (err) return reject(err)
    resolve(nextMeg)
  })
})

const generateResponse = (b) => ({
  statusCode: 200,
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  body: JSON.stringify(b)
})

// TODO: IAM & Proper CORS
export const getAdminPanel = async (event, context, callback) => {
  try {
    const completedOrdersObj = await getAllFinishedOrders()
    const completedOrderCount = completedOrdersObj.Count
    const completedOrdersByDay = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] }

    // Calculate order times & bucket the orders
    completedOrdersObj.Items.map(completedOrder => {
      const times = completedOrder.payload.M.time.M
      const createdAt = moment(times.createdAt.S)
      const finishedAt = moment(parseInt(times.finishedAt.N))

      completedOrdersByDay[createdAt.day()].push({
        createdAt,
        finishedAt,
        timeToComplete: finishedAt.diff(createdAt, 'seconds')
      })
    })

    const flattenOrderCompletionTimes = R.map(R.prop('timeToComplete'))
    const getAverageOfOrderCompletionTimes = (a) => R.compose(R.mean, flattenOrderCompletionTimes)(a) || 0

    const flatCompletedOrders = R.reduce(R.concat, [])(Object.values(completedOrdersByDay))

    // Recent is 12 hours
    const allOrdersRecent = R.filter(o => o.createdAt.isAfter(moment().subtract(12, 'hours')))(flatCompletedOrders)

    // Calculate 
    return callback(null, generateResponse({
      status: true,
      avgOrderTime: getAverageOfOrderCompletionTimes(flatCompletedOrders),
      avgOrderTimeRecent: getAverageOfOrderCompletionTimes(allOrdersRecent),
      dayByDayOrderCompletionTimes: R.map(getAverageOfOrderCompletionTimes)(completedOrdersByDay),
      dayByDayOrderCount: R.map(R.compose(R.length, flattenOrderCompletionTimes))(completedOrdersByDay)
    }))
  } catch (e) {
    console.log("Fail: ", e)

    return callback(null, generateResponse({ status: false }))
  }
}

export const handleWebhooks = async (event, context, callback) => {
  const { entity_id: id, location_id: locationId, event_type: eventType } = JSON.parse(event.body)

  // If not from Square OR not for the Tabuleh Cafe, drop it.
  if (locationId === process.env.LOCATION_ID && isValidRequest()) {
    if (eventType === 'PAYMENT_UPDATED') {
      const squareOrder = (await getPaymentById(id)).data

      if (wasOrderRefunded(squareOrder)) {
        removeFromDeviceShadow(squareOrder.id)
      } else {
        addToDeviceShadow(generatePayloadFromSquareOrder(squareOrder))
      }
    } else {
      console.log("Unsupported Event Type: ", eventType)
    }
  } else {
    console.log("Invalid Message OR Location ID")
  }

  return callback(null, generateResponse({}))
}

export const auth = (event, context, callback) => {
  try {
    getIoTDeviceToken().then(b => callback(null, generateResponse(b)));
  } catch (e) {
    callback(e)
  }
};
