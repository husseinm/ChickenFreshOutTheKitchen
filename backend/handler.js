import AWS from 'aws-sdk'
import R from 'ramda'

const iot = new AWS.Iot({ region: 'us-east-1' });
const sts = new AWS.STS({ region: 'us-east-1' });

const roleName = 'employee-chickenfreshoutthekitchen';

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

const generateOrderFromSquareItems = items => {
  console.log(items)
  return items
}



export const handleWebhooks = async (event, context, callback) => {
  const { entity_id: entityId, location_id: locationId, event_type: eventType } = JSON.parse(event.body)

  // If not from Square OR not for the Tabuleh Cafe, drop it.
  if (locationId !== process.env.LOCATION_ID || !isValidRequest())
    return callback(null, { status: false, message: 'Invalid Request' })


  if (eventType === 'PAYMENT_UPDATED') {
    const squareOrder = await getPaymentById(entityId)
    generateOrderFromSquareItems(squareOrder.itemizations)

  } else {
    return callback(null, { status: false, message: 'Unhandled Event Type' })
  }
}

export const auth = (event, context, callback) => {
  // Get the endpoint address
  iot.describeEndpoint({}, (err, data) => {
    if (err) return callback(err);

    const iotEndpoint = data.endpointAddress;

    const partial = iotEndpoint.replace('.amazonaws.com', '');
    const iotIndex = iotEndpoint.indexOf('iot'); 
    const region = partial.substring(iotIndex + 4);

    // Get the account id which will be used to assume a role
    sts.getCallerIdentity({}, (err, data) => {
      if (err) return callback(err);

      const params = {
        RoleArn: `arn:aws:iam::${data.Account}:role/${roleName}`,
        RoleSessionName: (Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).toString()
      };

      // Assume role returns temporary keys
      sts.assumeRole(params, (err, data) => {
        if (err) return callback(err);

        callback(null, {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                iotEndpoint,
                region,
                accessKey: data.Credentials.AccessKeyId,
                secretKey: data.Credentials.SecretAccessKey,
                sessionToken: data.Credentials.SessionToken
            })
        });
      });
    });
  });
};
