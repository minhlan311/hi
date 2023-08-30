import { HISTORY_PATH } from '../constants/paths'
import { call, put, delay, takeLatest } from 'redux-saga/effects'
import { setHeader } from '../services/api'
import settings from '../settings'
import axios from '../utils/axios'
import {
    getHistoryRequest,
    getHistorySuccess,
    getHistoryFailure,
    updateHistoryRequest,
    updateHistorySuccess,
    updateHistoryFailure,
} from '../slices/history'
import { getStorage } from '../services/storage'
import { USER_INFO } from '../constants/storageKeys'
const user = getStorage(USER_INFO)

export function* getHistory({ payload }) {
    try {
        const response = yield call(() => {
            return axios.get(
                settings.API_URL + HISTORY_PATH + user?._id,
                payload,
                {
                    headers: setHeader(),
                }
            )
        })

        if (response && response.status === 200) {
            yield delay(800)
            yield put(getHistorySuccess(response))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(getHistoryFailure(message))
    }
}

export function* updateHistory({ payload }) {
    try {
        const response = yield call(() => {
            return axios.put(
                settings.AUTH_URL + HISTORY_PATH + user?._id,
                payload,
                {
                    headers: setHeader(),
                }
            )
        })
        if (response && response.status === 200) {
            yield delay(800)
            yield put(updateHistorySuccess(response))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error

        yield put(updateHistoryFailure(message))
    }
}

export default function* historySaga() {
    yield takeLatest(getHistoryRequest().type, getHistory)
    yield takeLatest(updateHistoryRequest().type, updateHistory)
}
