import { call, put, delay, takeEvery } from 'redux-saga/effects'

import { setHeader } from '../services/api'

import settings from '../settings'
import axios from '../utils/axios'
import {
    ANSWER_PEDAGOGY_PATH,
    FIND_ANSWER_PEDAGOGY_PATH,
    FIND_PEDAGOGY_PATH,
    PEDAGOGY_PATH,
} from '../constants/paths'
import {
    createAnswerFailure,
    createAnswerRequest,
    createAnswerSuccess,
    createPedagogyFailure,
    createPedagogyRequest,
    createPedagogySuccess,
    deletePedagogyFailure,
    deletePedagogyRequest,
    deletePedagogySuccess,
    getAnswersFailure,
    getAnswersRequest,
    getAnswersSuccess,
    getPedagogiesFailure,
    getPedagogiesRequest,
    getPedagogiesSuccess,
} from '../slices/pedagogy'

export function* getPedagogies({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(settings.API_URL + FIND_PEDAGOGY_PATH, payload, {
                headers: setHeader(),
            })
        })
        if (response && response.status === 201) {
            // yield delay(800)
            yield put(getPedagogiesSuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(getPedagogiesFailure(message))
    }
}

export function* createPedagogy({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(settings.API_URL + PEDAGOGY_PATH, payload, {
                headers: setHeader(),
            })
        })
        if (response && response.status === 201) {
            // yield delay(800)
            yield put(createPedagogySuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(createPedagogyFailure(message))
    }
}
export function* deletePedagogy({ payload }) {
    try {
        const response = yield call(() => {
            return axios.delete(
                settings.API_URL + PEDAGOGY_PATH + '/' + payload,
                {
                    headers: setHeader(),
                }
            )
        })

        if (response && response.status === 200) {
            // yield delay(800)
            yield put(deletePedagogySuccess(response.data))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(deletePedagogyFailure(message))
    }
}

export function* getAnswers({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(
                settings.API_URL + FIND_ANSWER_PEDAGOGY_PATH,
                payload,
                {
                    headers: setHeader(),
                }
            )
        })
        if (response && response.status === 201) {
            // yield delay(800)
            yield put(getAnswersSuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(getAnswersFailure(message))
    }
}

export function* createAnswer({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(
                settings.API_URL + ANSWER_PEDAGOGY_PATH,
                payload,
                {
                    headers: setHeader(),
                }
            )
        })
        if (response && response.status === 201) {
            // yield delay(800)
            yield put(createAnswerSuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(createAnswerFailure(message))
    }
}
export default function* pedagogySaga() {
    yield takeEvery(getPedagogiesRequest().type, getPedagogies)
    yield takeEvery(createPedagogyRequest().type, createPedagogy)
    yield takeEvery(deletePedagogyRequest().type, deletePedagogy)
    yield takeEvery(getAnswersRequest().type, getAnswers)
    yield takeEvery(createAnswerRequest().type, createAnswer)
}
