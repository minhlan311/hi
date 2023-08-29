import { COMMENT_PATH, FIND_COMMENTS_PATH } from '../constants/paths'
import { call, put, takeEvery } from 'redux-saga/effects'
import { setHeader } from '../services/api'
import settings from '../settings'
import axios from '../utils/axios'
import {
    getCommentsRequest,
    getCommentsSuccess,
    getCommentsFailure,
    getCommentDetailRequest,
    getCommentDetailSuccess,
    getCommentDetailFailure,
    replyCommentsRequest,
    replyCommentsSuccess,
    replyCommentsFailure,
    createCommentsRequest,
    createCommentsSuccess,
    createCommentsFailure,
    updateCommentsRequest,
    updateCommentsSuccess,
    updateCommentsFailure,
    deleteCommentsRequest,
    deleteCommentsSuccess,
    deleteCommentsFailure,
    resetCommentState,
} from '../slices/comment'
export function* getComments({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(settings.API_URL + FIND_COMMENTS_PATH, payload, {
                headers: setHeader(),
            })
        })

        if (response && response.status === 201) {
            // yield delay(800)
            yield put(getCommentsSuccess(response.data))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(getCommentsFailure(message))
    }
}

export function* getCommentDetail({ payload }) {
    try {
        const response = yield call(() => {
            return axios.get(
                settings.API_URL + COMMENT_PATH + payload,
                payload,
                {
                    headers: setHeader(),
                }
            )
        })

        if (response && response.status === 201) {
            // yield delay(800)
            yield put(getCommentDetailSuccess(response.data))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(getCommentDetailFailure(message))
    }
}

export function* replyComments({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(settings.API_URL + COMMENT_PATH, payload, {
                headers: setHeader(),
            })
        })

        if (response && response.status === 201) {
            // yield delay(800)
            yield put(replyCommentsSuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(replyCommentsFailure(message))
    }
}

export function* createComments({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(settings.API_URL + COMMENT_PATH, payload, {
                headers: setHeader(),
            })
        })
        if (response && response.status === 201) {
            // yield delay(800)

            yield put(createCommentsSuccess(response.data))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(createCommentsFailure(message))
    }
}

export function* deleteComments({ payload }) {
    try {
        const response = yield call(() => {
            return axios.delete(settings.API_URL + COMMENT_PATH + payload, {
                headers: setHeader(),
            })
        })
        if (response && response.status === 200) {
            // yield delay(800)
            yield put(deleteCommentsSuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(deleteCommentsFailure(message))
    }
}

export function* updateComments({ payload }) {
    try {
        const response = yield call(() => {
            return axios.put(
                settings.API_URL + COMMENT_PATH + payload.id,
                payload,
                {
                    headers: setHeader(),
                }
            )
        })
        if (response && response.status === 200) {
            // yield delay(800)
            yield put(updateCommentsSuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(updateCommentsFailure(message))
    }
}
function* resetComment() {
    try {
        yield console.log('reset')
    } catch (error) {
        console.log(error)
    }
}
export default function* documentSaga() {
    yield takeEvery(getCommentsRequest().type, getComments)
    yield takeEvery(getCommentDetailRequest().type, getCommentDetail)
    yield takeEvery(replyCommentsRequest().type, replyComments)
    yield takeEvery(createCommentsRequest().type, createComments)
    yield takeEvery(updateCommentsRequest().type, updateComments)
    yield takeEvery(deleteCommentsRequest().type, deleteComments)
    yield takeEvery(resetCommentState().type, resetComment)
}
