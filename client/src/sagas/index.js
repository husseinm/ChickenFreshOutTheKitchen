import { call, takeEvery } from 'redux-saga/effects'
import awsIot from 'aws-iot-device-sdk';

import { OrderActionNames } from '../actions/orders'
import { AppActionNames } from '../actions/app'

let client, iotTopic;
const IoT = {
    connect: (topic, iotEndpoint, region, accessKey, secretKey, sessionToken) => {
        iotTopic = topic;
        // connect
        client = awsIot.device({
            region: region,
            protocol: 'wss',
            accessKeyId: accessKey,
            secretKey: secretKey,
            sessionToken: sessionToken,
            port: 443,
            host: iotEndpoint
        });

        client.on('connect', () => client.subscribe(iotTopic));
        client.on('message', handleServerMessage);
        client.on('close', () => console.log('Connection Failed'));
    },

    send: (message) => {
        client.publish(iotTopic, message); // send messages
    }
}

const handleServerMessage = (topic, message, packet) => {
    const data = JSON.parse(new TextDecoder('utf-8').decode(message))

    if (data.type === 'order') {

    }
    console.log()
}


export default function* sagas() {
    yield takeEvery(AppActionNames.InitiateAppSocket, connectToServer)
    yield takeEvery(OrderActionNames.MarkOrderCompleteInit, handleMarkOrderComplete)
}

function* connectToServer() {
    const keys = yield (yield call(fetch, 'https://78ct2v2kqh.execute-api.us-east-1.amazonaws.com/dev/iot/keys')).json()
    console.log("Test?")
    IoT.connect('/tabulehcafe', keys.iotEndpoint, keys.region, keys.accessKey, keys.secretKey, keys.sessionToken)
}

function* handleMarkOrderComplete({ orderId }) {
    yield call(console.log, "I would send data to socket.io")
    /*
    try {
        yield call(reportsApi.create, {title: 'A New Report'})
        yield put(ReportActions.GetAllReports())
    } catch (error) {
        yield call(console.log, `Failed to create a new report, Got: \n${JSON.stringify(error)}, \n ${error}`)
        yield put(ReportActions.CreateReportFailed())
    }
    */
}
