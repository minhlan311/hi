import {
    FIND_EXAMS_PATH,
    EXAMS_DETAIL_PATH,
    SUBMIT_EXAMS_PATH,
    EXAMS_PATH,
} from '../constants/paths'
import { call, put as putD, takeEvery } from 'redux-saga/effects'

import { setHeader } from '../services/api'

import settings from '../settings'
import axios from '../utils/axios'
import {
    getExamsRequest,
    getExamsSuccess,
    getExamsFailure,
    getExamDetailRequest,
    getExamDetailSuccess,
    getExamDetailFailure,
    submitExamDataRequest,
    submitExamDataSuccess,
    submitExamDataFailure,
    createExamDataSuccess,
    createExamDataFailure,
    createExamDataRequest,
    updateExamDataSuccess,
    updateExamDataRequest,
    updateExamDataFailure,
    deleteExamDataSuccess,
    deleteExamDataFailure,
    deleteExamDataRequest,
    clearExamDataRequest,
    resetSateRequest,
    resetExamState,
} from '../slices/exam'

export function* getExams({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(settings.API_URL + FIND_EXAMS_PATH, payload, {
                headers: setHeader(),
            })
        })
        if (response && response.status === 201) {
            yield putD(getExamsSuccess(response.data))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield putD(getExamsFailure(message))
    }
}

export function* getExamDetail({ payload }) {
    try {
        const response = yield call(() => {
            return axios.get(settings.API_URL + EXAMS_DETAIL_PATH + payload, {
                headers: setHeader(),
            })
        })

        if (response && response.status === 200) {
            // yield delay(800)clearExamDataRequest

            yield putD(getExamDetailSuccess(response.data))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield putD(getExamDetailFailure(message))
    }
}

export function* submitExam({ payload }) {
    const { id, requestData } = payload
    try {
        const response = yield call(() => {
            return axios.post(
                settings.API_URL + SUBMIT_EXAMS_PATH + id,
                requestData,
                {
                    headers: setHeader(),
                }
            )
        })

        if (response && response.status === 201) {
            // yield delay(800)
            yield putD(submitExamDataSuccess(response.data))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield putD(submitExamDataFailure(message))
    }
}

export function* createExams({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(settings.API_URL + EXAMS_PATH, payload, {
                headers: setHeader(),
            })
        })
        if (response && response.status === 201) {
            // yield delay(800)
            yield putD(createExamDataSuccess(response.data))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield putD(createExamDataFailure(message))
    }
}

export function* updateExams({ payload }) {
    const { id, requestData } = payload
    try {
        const response = yield call(() => {
            return axios.put(
                settings.API_URL + EXAMS_PATH + '/' + id,
                requestData,
                {
                    headers: setHeader(),
                }
            )
        })
        if (response && response.status === 201) {
            // yield delay(800)
            yield putD(updateExamDataSuccess(response.data))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield putD(updateExamDataFailure(message))
    }
}

export function* deleteExam({ payload }) {
    try {
        const response = yield call(() => {
            return axios.delete(settings.API_URL + EXAMS_PATH + '/' + payload, {
                headers: setHeader(),
            })
        })

        if (response && response.status === 200) {
            // yield delay(800)
            yield putD(deleteExamDataSuccess(response.data))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield putD(deleteExamDataFailure(message))
    }
}
export function* resetExams({ payload }) {
    try {
        const response = yield putD(clearExamDataRequest())
        if (response && response.status === 201) {
            // yield delay(800)
            yield putD(createExamDataSuccess(response.data))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield putD(createExamDataFailure(message))
    }
}

function* resetExam() {
    try {
        yield console.log('reset')
    } catch (error) {
        console.log(error)
    }
}
export default function* examSaga() {
    yield takeEvery(getExamsRequest().type, getExams)
    yield takeEvery(getExamDetailRequest().type, getExamDetail)
    yield takeEvery(submitExamDataRequest().type, submitExam)
    yield takeEvery(createExamDataRequest().type, createExams)
    yield takeEvery(updateExamDataRequest().type, updateExams)
    yield takeEvery(deleteExamDataRequest().type, deleteExam)
    yield takeEvery(resetSateRequest().type, resetExams)
    yield takeEvery(resetExamState().type, resetExam)
}
