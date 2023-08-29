import { FIND_LESSONS_PATH, LESSONS_PATH } from '../constants/paths'
import { call, put, takeEvery } from 'redux-saga/effects'

import { setHeader } from '../services/api'

import settings from '../settings'
import axios from '../utils/axios'
import {
    getLessonsFailure,
    getLessonsRequest,
    getLessonsSuccess,
    getLessonDetailRequest,
    getLessonDetailSuccess,
    getLessonDetailFailure,
    createLessonsRequest,
    createLessonsSuccess,
    createLessonsFailure,
    updateLessonsRequest,
    updateLessonsSuccess,
    updateLessonsFailure,
    deleteLessonsRequest,
    deleteLessonsSuccess,
    deleteLessonsFailure,
    resetLessonsState,
} from '../slices/lessons'

export function* getLessons({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(settings.API_URL + FIND_LESSONS_PATH, payload, {
                headers: setHeader(),
            })
        })
        if (response && response.status === 201) {
            // yield delay(800)
            yield put(getLessonsSuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error

        yield put(getLessonsFailure(message))
    }
}

export function* getLessonDetail({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(settings.API_URL + LESSONS_PATH + '/' + payload, {
                headers: setHeader(),
            })
        })
        if (response && response.status === 201) {
            // yield delay(800)
            yield put(getLessonDetailSuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error

        yield put(getLessonDetailFailure(message))
    }
}

export function* createLessons({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(settings.API_URL + LESSONS_PATH, payload, {
                headers: setHeader(),
            })
        })
        if (response && response.status === 201) {
            // yield delay(800)
            yield put(createLessonsSuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error

        yield put(createLessonsFailure(message))
    }
}

export function* updateLessons({ payload }) {
    try {
        const response = yield call(() => {
            return axios.put(
                settings.API_URL + LESSONS_PATH + '/' + payload.id,
                payload.body,
                {
                    headers: setHeader(),
                }
            )
        })
        if (response && response.status === 200) {
            // yield delay(800)
            yield put(updateLessonsSuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error

        yield put(updateLessonsFailure(message))
    }
}

export function* deleteLessons({ payload }) {
    try {
        const response = yield call(() => {
            return axios.delete(
                settings.API_URL + LESSONS_PATH + '/' + payload,
                payload,
                {
                    headers: setHeader(),
                }
            )
        })
        if (response && response.status === 200) {
            // yield delay(800)
            yield put(deleteLessonsSuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error

        yield put(deleteLessonsFailure(message))
    }
}

function* resetLessons() {
    try {
        yield console.log('reset')
    } catch (error) {
        console.log(error)
    }
}

export default function* lessonSaga() {
    yield takeEvery(getLessonsRequest().type, getLessons)
    yield takeEvery(getLessonDetailRequest().type, getLessonDetail)
    yield takeEvery(createLessonsRequest().type, createLessons)
    yield takeEvery(updateLessonsRequest().type, updateLessons)
    yield takeEvery(deleteLessonsRequest().type, deleteLessons)
    yield takeEvery(resetLessonsState().type, resetLessons)
}
