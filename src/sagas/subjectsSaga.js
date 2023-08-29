import { FIND_SUBJECTS_PATH, SUBJECTS_PATH } from '../constants/paths'
import { call, put, takeEvery } from 'redux-saga/effects'

import { setHeader } from '../services/api'

import settings from '../settings'
import axios from '../utils/axios'
import {
    findSubjectRequest,
    findSubjectSuccess,
    findSubjectFailure,
    subjectDetailRequest,
    subjectDetailSuccess,
    subjectDetailFailure,
} from '../slices/subjects'

export function* findSubjects({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(settings.API_URL + FIND_SUBJECTS_PATH, payload, {
                headers: setHeader(),
            })
        })
        if (response && response.status === 201) {
            // yield delay(800)
            yield put(findSubjectSuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error

        yield put(findSubjectFailure(message))
    }
}
export function* findSubjectsDetail({ payload }) {
    try {
        const response = yield call(() => {
            return axios.get(settings.API_URL + SUBJECTS_PATH + payload, {
                headers: setHeader(),
            })
        })
        if (response && response.status === 200) {
            yield put(subjectDetailSuccess(response.data))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error

        yield put(subjectDetailFailure(message))
    }
}

export default function* enrollSaga() {
    yield takeEvery(findSubjectRequest().type, findSubjects)
    yield takeEvery(subjectDetailRequest().type, findSubjectsDetail)
}
