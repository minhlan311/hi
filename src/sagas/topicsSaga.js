import { FIND_TOPIC_PATH, TOPIC_PATH } from '../constants/paths'
import { call, put, takeEvery } from 'redux-saga/effects'

import { setHeader } from '../services/api'

import settings from '../settings'
import axios from '../utils/axios'
import {
    getTopicsFailure,
    getTopicsRequest,
    getTopicsSuccess,
    getTopicDetailRequest,
    getTopicDetailSuccess,
    getTopicDetailFailure,
    createTopicsRequest,
    createTopicsSuccess,
    createTopicsFailure,
    updateTopicsRequest,
    updateTopicsSuccess,
    updateTopicsFailure,
    deleteTopicsRequest,
    deleteTopicsSuccess,
    deleteTopicsFailure,
    resetTopicState,
} from '../slices/topics'

export function* getTopics({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(settings.API_URL + FIND_TOPIC_PATH, payload, {
                headers: setHeader(),
            })
        })
        if (response && response.status === 201) {
            // yield delay(800)
            yield put(getTopicsSuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error

        yield put(getTopicsFailure(message))
    }
}

export function* getTopicDetail({ payload }) {
    try {
        const response = yield call(() => {
            return axios.get(settings.API_URL + TOPIC_PATH + '/' + payload, {
                headers: setHeader(),
            })
        })
        if (response && response.status === 200) {
            // yield delay(800)
            yield put(getTopicDetailSuccess(response.data))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error

        yield put(getTopicDetailFailure(message))
    }
}

export function* createTopics({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(settings.API_URL + TOPIC_PATH, payload, {
                headers: setHeader(),
            })
        })
        if (response && response.status === 201) {
            // yield delay(800)
            yield put(createTopicsSuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error

        yield put(createTopicsFailure(message))
    }
}

export function* updateTopic({ payload }) {
    try {
        const response = yield call(() => {
            return axios.put(
                settings.API_URL + TOPIC_PATH + '/' + payload.id,
                payload.body,
                {
                    headers: setHeader(),
                }
            )
        })
        if (response && response.status === 200) {
            // yield delay(800)
            yield put(updateTopicsSuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error

        yield put(updateTopicsFailure(message))
    }
}

export function* deleteTopic({ payload }) {
    try {
        const response = yield call(() => {
            return axios.delete(settings.API_URL + TOPIC_PATH + '/' + payload, {
                headers: setHeader(),
            })
        })
        if (response && response.status === 200) {
            // yield delay(800)
            yield put(deleteTopicsSuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error

        yield put(deleteTopicsFailure(message))
    }
}
function* resetTopic() {
    try {
        yield console.log('reset')
    } catch (error) {
        console.log(error)
    }
}

export default function* topicSaga() {
    yield takeEvery(getTopicsRequest().type, getTopics)
    yield takeEvery(getTopicDetailRequest().type, getTopicDetail)
    yield takeEvery(createTopicsRequest().type, createTopics)
    yield takeEvery(updateTopicsRequest().type, updateTopic)
    yield takeEvery(deleteTopicsRequest().type, deleteTopic)
    yield takeEvery(resetTopicState().type, resetTopic)
}
