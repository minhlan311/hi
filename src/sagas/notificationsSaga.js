import { NOTIFICATIONS, NOTIFICATIONS_PATH } from '../constants/paths'
import { call, put, takeEvery } from 'redux-saga/effects'

import { setHeader } from '../services/api'

import settings from '../settings'
import axios from '../utils/axios'
import {
    getNotificationRequest,
    getNotificationSuccess,
    getNotificationFailure,
    putNotificationRequest,
    putNotificationSuccess,
    putNotificationFailure,
} from '../slices/notifications'

export function* getNotification({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(settings.API_URL + NOTIFICATIONS_PATH, payload, {
                headers: setHeader(),
            })
        })

        if (response && response.status === 201) {
            // yield delay(800)
            yield put(getNotificationSuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(getNotificationFailure(message))
    }
}
export function* putNotification({ payload }) {
    try {
        const response = yield call(() => {
            return axios.put(
                settings.API_URL + NOTIFICATIONS + '/' + payload.id,
                payload,
                {
                    headers: setHeader(),
                }
            )
        })

        if (response && response.status === 200) {
            // yield delay(800)
            yield put(putNotificationSuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(putNotificationFailure(message))
    }
}
export default function* enrollSaga() {
    yield takeEvery(getNotificationRequest().type, getNotification)
    yield takeEvery(putNotificationRequest().type, putNotification)
}
