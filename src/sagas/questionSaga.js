import {
    FIND_QUESTIONS_PATH,
    IMPORT_QUESTIONS_PATH,
    QUESTIONS_DETAIL_PATH,
    QUESTIONS_PATH,
} from '../constants/paths'
import { call, put as putD, takeEvery } from 'redux-saga/effects'

import { setHeader } from '../services/api'

import settings from '../settings'
import axios from '../utils/axios'
import {
    createQuestionFailure,
    createQuestionRequest,
    createQuestionSuccess,
    deleteQuestionFailure,
    deleteQuestionRequest,
    deleteQuestionSuccess,
    getQuestionDetailFailure,
    getQuestionDetailRequest,
    getQuestionDetailSuccess,
    getQuestionsFailure,
    getQuestionsRequest,
    getQuestionsSuccess,
    importQuestionFailure,
    importQuestionRequest,
    importQuestionSuccess,
    updateQuestionFailure,
    updateQuestionRequest,
    updateQuestionSuccess,
    resetQuestionState,
} from '../slices/question'

export function* getQuestions({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(settings.API_URL + FIND_QUESTIONS_PATH, payload, {
                headers: setHeader(),
            })
        })
        if (response && response.status === 201) {
            yield putD(getQuestionsSuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield putD(getQuestionsFailure(message))
    }
}

export function* getQuestionDetail({ payload }) {
    try {
        const response = yield call(() => {
            return axios.get(
                settings.API_URL + QUESTIONS_DETAIL_PATH + payload,
                {
                    headers: setHeader(),
                }
            )
        })

        if (response && response.status === 200) {
            // yield delay(800)
            yield putD(getQuestionDetailSuccess(response.data))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield putD(getQuestionDetailFailure(message))
    }
}

export function* createQuestions({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(settings.API_URL + QUESTIONS_PATH, payload, {
                headers: setHeader(),
            })
        })
        if (response && response.status === 201) {
            // yield delay(800)
            yield putD(createQuestionSuccess(response.data))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield putD(createQuestionFailure(message))
    }
}

export function* updateQuestions({ payload }) {
    const { id, requestData } = payload
    try {
        const response = yield call(() => {
            return axios.put(
                settings.API_URL + QUESTIONS_PATH + '/' + id,
                requestData,
                {
                    headers: setHeader(),
                }
            )
        })
        if (response && response.status === 200) {
            // yield delay(800)
            yield putD(updateQuestionSuccess(response.data))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield putD(updateQuestionFailure(message))
    }
}

export function* deleteQuestion({ payload }) {
    try {
        const response = yield call(() => {
            return axios.delete(
                settings.API_URL + QUESTIONS_PATH + '/' + payload,
                {
                    headers: setHeader(),
                }
            )
        })

        if (response && response.status === 200) {
            // yield delay(800)
            yield putD(deleteQuestionSuccess(response.data))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield putD(deleteQuestionFailure(message))
    }
}

export function* importQuestions({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(
                settings.API_URL + IMPORT_QUESTIONS_PATH,
                payload,
                {
                    headers: setHeader(),
                }
            )
        })
        if (response && response.status === 201) {
            // yield delay(800)
            yield putD(importQuestionSuccess(response.data))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield putD(importQuestionFailure(message))
    }
}
function* resetQuestion() {
    try {
        yield console.log('reset')
    } catch (error) {
        console.log(error)
    }
}
export default function* questionSaga() {
    yield takeEvery(getQuestionsRequest().type, getQuestions)
    yield takeEvery(getQuestionDetailRequest().type, getQuestionDetail)
    yield takeEvery(createQuestionRequest().type, createQuestions)
    yield takeEvery(updateQuestionRequest().type, updateQuestions)
    yield takeEvery(deleteQuestionRequest().type, deleteQuestion)
    yield takeEvery(importQuestionRequest().type, importQuestions)
    yield takeEvery(resetQuestionState().type, resetQuestion)
}
