import { ASSESSMENT_PATH, FIND_ASSESSMENT_PATH } from '../constants/paths'
import { call, put, takeEvery } from 'redux-saga/effects'

import { setHeader } from '../services/api'

import settings from '../settings'
import axios from '../utils/axios'
import {
    createAssessmentRequest,
    createAssessmentSuccess,
    createAssessmentFailure,
    getAssessmentRequest,
    getAssessmentSuccess,
    getAssessmentFailure,
    getAssessmentUserRequest,
    getAssessmentUserSuccess,
    getAssessmentUserFailure,
    resetAssessmentState,
} from '../slices/assessment'

export function* createAssessment({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(settings.API_URL + ASSESSMENT_PATH, payload, {
                headers: setHeader(),
            })
        })

        if (response && response.status === 201) {
            // yield delay(800)
            yield put(createAssessmentSuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(createAssessmentFailure(message))
    }
}

export function* getAssessment({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(
                settings.API_URL + FIND_ASSESSMENT_PATH,
                payload,
                {
                    headers: setHeader(),
                }
            )
        })

        if (response && response.status === 201) {
            // yield delay(800)
            yield put(getAssessmentSuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(getAssessmentFailure(message))
    }
}

export function* getAssessmentUser({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(
                settings.API_URL + FIND_ASSESSMENT_PATH,
                payload,
                {
                    headers: setHeader(),
                }
            )
        })

        if (response && response.status === 201) {
            // yield delay(800)
            yield put(getAssessmentUserSuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(getAssessmentUserFailure(message))
    }
}
function* resetAssessment() {
    try {
        yield console.log('reset')
    } catch (error) {
        console.log(error)
    }
}

export default function* assessmentSaga() {
    yield takeEvery(createAssessmentRequest().type, createAssessment)
    yield takeEvery(getAssessmentRequest().type, getAssessment)
    yield takeEvery(getAssessmentUserRequest().type, getAssessmentUser)
    yield takeEvery(resetAssessmentState().type, resetAssessment)
}
