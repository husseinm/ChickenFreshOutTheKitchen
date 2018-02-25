import { call, takeEvery } from 'redux-saga/effects'

import { OrderActionNames } from '../actions/orders'


export default function* sagas() {
    yield takeEvery(OrderActionNames.MarkOrderCompleteInit, handleMarkOrderComplete)
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
