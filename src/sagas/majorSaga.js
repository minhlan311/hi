import { call, put, takeEvery } from 'redux-saga/effects'

import { setHeader } from '../services/api'

import settings from '../settings'
import axios from '../utils/axios'
import {
    getMajorsRequest,
    getMajorsSuccess,
    getMajorsFailure,
    getMajorDetailRequest,
    getMajorDetailSuccess,
    getMajorDetailFailure,
} from '../slices/major'
import { FIND_MAJORS_PATH, MAJORS_PATH } from '../constants/paths'

export function* getMajors({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(settings.API_URL + FIND_MAJORS_PATH, payload, {
                headers: setHeader(),
            })
        })

        if (response && response.status === 201) {
            // yield delay(800)
            yield put(getMajorsSuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error

        yield put(getMajorsFailure(message))
    }
}

export function* getMajorDetail({ payload }) {
    try {
        const response = yield call(() => {
            return axios.get(settings.API_URL + MAJORS_PATH + payload, {
                headers: setHeader(),
            })
        })
        if (response && response.status === 201) {
            // yield delay(800)
            yield put(getMajorDetailSuccess(response))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error

        yield put(getMajorDetailFailure(message))
    }
}

export default function* majorSaga() {
    yield takeEvery(getMajorsRequest().type, getMajors)
    yield takeEvery(getMajorDetailRequest().type, getMajorDetail)
}
