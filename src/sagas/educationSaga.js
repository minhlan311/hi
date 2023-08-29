import { FIND_EDUCATIONS_PATH, EDUCATIONS_PATH } from '../constants/paths'
import { call, put, takeEvery } from 'redux-saga/effects'

import { setHeader } from '../services/api'

import settings from '../settings'
import axios from '../utils/axios'
import {
    getEducationsRequest,
    getEducationsSuccess,
    getEducationsFailure,
    getEducationDetailFailure,
    getEducationDetailRequest,
    getEducationDetailSuccess,
} from '../slices/education'

export function* getEducations({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(
                settings.API_URL + FIND_EDUCATIONS_PATH,
                payload,
                {
                    headers: setHeader(),
                }
            )
        })
        if (response && response.status === 201) {
            // yield delay(800)
            yield put(getEducationsSuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error

        yield put(getEducationsFailure(message))
    }
}

export function* getEducationDetail({ payload }) {
    try {
        const response = yield call(() => {
            return axios.get(settings.API_URL + EDUCATIONS_PATH + payload, {
                headers: setHeader(),
            })
        })
        if (response && response.status === 200) {
            // yield delay(800)
            yield put(getEducationDetailSuccess(response))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error

        yield put(getEducationDetailFailure(message))
    }
}

export default function* educationSaga() {
    yield takeEvery(getEducationsRequest().type, getEducations)
    yield takeEvery(getEducationDetailRequest().type, getEducationDetail)
}
