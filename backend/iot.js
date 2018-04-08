import AWS from 'aws-sdk'
import awsIot from 'aws-iot-device-sdk'
import encoding from 'text-encoding'
import R from 'ramda'

const region = 'us-east-1'
const iot = new AWS.Iot({ region: 'us-east-1' })
const roleName = 'employee-chickenfreshoutthekitchen'
const iotTopic = '/tabulehcafe'
const thingName = 'tabulehcafe'

let sts, iotData, iotEndpoint, partial, iotIndex = false;

const initializeIoT = () => new Promise((resolve, reject) => {
    if (iotData) return resolve();

    iot.describeEndpoint({}, (err, data) => {
        if (err) return reject(err)

        iotEndpoint = data.endpointAddress
        iotData = new AWS.IotData({ region, endpoint: iotEndpoint })
        sts = new AWS.STS({ region })

        resolve()
    })
})

const getShadow = () => initializeIoT().then(() => new Promise((resolve, reject) => {
    iotData.getThingShadow({ thingName }, (err, data) => {
        if (err) return resolve({})
        resolve(R.clone(JSON.parse(data.payload).state.desired))
    })
}))

const updateShadow = desired => initializeIoT().then(() => new Promise((resolve, reject) => {
    iotData.updateThingShadow({ thingName, payload: JSON.stringify({ state: { desired } }) }, (err, data) => {
        if (err) return reject(err)
        resolve()
    })
}))

export const addToDeviceShadow = obj => getShadow().then(currentState => {
    return updateShadow(R.assoc(obj.id, obj, currentState))
})

export const removeFromDeviceShadow = id => getShadow().then(currentState => {
    return updateShadow(R.dissoc(id, currentState))
})

export const getIoTDeviceToken = () => initializeIoT().then(() => new Promise((resolve, reject) => {
    // Get the account id which will be used to assume a role
    sts.getCallerIdentity({}, (err, data) => {
        if (err) return reject(err);

        const params = {
            RoleArn: `arn:aws:iam::${data.Account}:role/${roleName}`,
            RoleSessionName: (Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).toString()
        };

        // Assume role returns temporary keys
        sts.assumeRole(params, (err, data) => {
            if (err) return reject(err);

            resolve({
                iotEndpoint,
                region,
                accessKey: data.Credentials.AccessKeyId,
                secretKey: data.Credentials.SecretAccessKey,
                sessionToken: data.Credentials.SessionToken
            })
        });
    });
}))
