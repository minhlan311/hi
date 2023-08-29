import {
    ACTIVATION_CODE_PATH,
    FIND_ACTIVATION_CODE_PATH,
} from '../constants/paths'
import { call, put, takeEvery } from 'redux-saga/effects'

import { setHeader } from '../services/api'

import settings from '../settings'
import axios from '../utils/axios'
import {
    getListCodeRequest,
    getListCodeSuccess,
    getListCodeFailure,
    addCodeRequest,
    addCodeSuccess,
    addCodeFailure,
    resetSate,
    deleteCodeSuccess,
    deleteCodeFailure,
    deleteCodeRequest,
} from '../slices/activationCode'

export function* getListCode({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(
                settings.API_URL + FIND_ACTIVATION_CODE_PATH,
                payload,
                {
                    headers: setHeader(),
                }
            )
        })

        if (response && response.status === 201) {
            // yield delay(800)
            yield put(getListCodeSuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(getListCodeFailure(message))
    }
}

export function* addCode({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(
                settings.API_URL + ACTIVATION_CODE_PATH,
                payload,
                {
                    headers: setHeader(),
                }
            )
        })

        if (response && response.status === 201) {
            // yield delay(800)
            yield put(addCodeSuccess(response.data))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(addCodeFailure(message))
    }
}

export function* deleteCode({ payload }) {
    try {
        const response = yield call(() => {
            return axios.delete(
                settings.API_URL + ACTIVATION_CODE_PATH + '/' + payload,
                {
                    headers: setHeader(),
                }
            )
        })

        if (response && response.status === 201) {
            // yield delay(800)
            yield put(deleteCodeSuccess(response.data))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(deleteCodeFailure(message))
    }
}
export function* resetState() {
    yield put(resetSate())
}

export default function* activationSaga() {
    yield takeEvery(getListCodeRequest().type, getListCode)
    yield takeEvery(addCodeRequest().type, addCode)
    yield takeEvery(deleteCodeRequest().type, deleteCode)
    yield takeEvery(resetSate().type, resetState)
    yield takeEvery(deleteCodeRequest().type, deleteCode)
}
