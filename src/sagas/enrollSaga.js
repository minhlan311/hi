import { ENROLL_PATH } from '../constants/paths'
import { call, put, takeEvery } from 'redux-saga/effects'

import { setHeader } from '../services/api'

import settings from '../settings'
import axios from '../utils/axios'
import {
    getListEnRollRequest,
    getListEnRollSuccess,
    getListEnRollFailure,
} from '../slices/enroll'

export function* getListEnRoll({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(settings.API_URL + ENROLL_PATH, payload, {
                headers: setHeader(),
            })
        })

        if (response && response.status === 201) {
            // yield delay(800)
            yield put(getListEnRollSuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(getListEnRollFailure(message))
    }
}
export default function* enrollSaga() {
    yield takeEvery(getListEnRollRequest().type, getListEnRoll)
}
