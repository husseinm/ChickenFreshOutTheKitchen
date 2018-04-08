import { eventChannel } from 'redux-saga'
import { put, call, takeEvery, take } from 'redux-saga/effects'
import awsIot from 'aws-iot-device-sdk';

import { OrderActionNames, gotOrdersAC } from '../actions/orders'
import { AppActionNames } from '../actions/app'

// TODO: For some reason the lifecycle events aren't working...
let client;
const ConnectToServer = (keys) => {
    client = awsIot.device({
        region: keys.region,
        protocol: 'wss',
        accessKeyId: keys.accessKey,
        secretKey: keys.secretKey,
        sessionToken: keys.sessionToken,
        port: 443,
        host: keys.iotEndpoint
    })

    client.on('connect', () => {
        client.subscribe('$aws/things/tabulehcafe/shadow/update/accepted')
        client.subscribe('$aws/things/tabulehcafe/shadow/get/accepted')

        client.publish('$aws/things/tabulehcafe/shadow/get', '')
    })

    return client
}

function* channelServerMessages(client) {
    return eventChannel(emit => {
        client.on('message', (topic, message, packet) => {
            const data = JSON.parse(new TextDecoder('utf-8').decode(message))
            emit({ topic, data })
        })

        return () => {} // You can never stop listening bitch.
    })
}

export default function* sagas() {
    yield takeEvery(AppActionNames.InitiateAppSocket, connectToServer)
    yield takeEvery(OrderActionNames.MarkOrderCompleteInit, handleMarkOrderComplete)
    yield takeEvery(OrderActionNames.MarkOrderCompleteInit, handleMarkOrderComplete)
}

function* handleServerMessage() {
}

function* connectToServer() {
    const keys = yield (yield call(fetch, 'https://78ct2v2kqh.execute-api.us-east-1.amazonaws.com/dev/iot/keys')).json()
    yield call(ConnectToServer, keys)
    const serverMessagesChannel = yield call(channelServerMessages, client)

    let currentVersion = -1

    while (true) {
        const payload = yield take(serverMessagesChannel)
        console.log(payload)

        if (payload.data.version > currentVersion) {
            const desiredState = payload.data.state.desired
            yield put(gotOrdersAC(desiredState))
        }
    }
}

function* handleMarkOrderComplete({ order }) {
    yield call(client.publish, '/tabulehcafe/orders/finished', JSON.stringify({
        orderId: order.id,
        time: {
            createdAt: order.created_at,
            finishedAt: Date.now()
        }
    }))
}
