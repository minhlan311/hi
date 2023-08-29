import {
    GET_ATTACHMENT,
    UPLOAD_ATTACHMENT,
    UPLOAD_IMAGE,
} from '../constants/paths'
import { call, put, takeEvery } from 'redux-saga/effects'

import { setHeader } from '../services/api'

import settings from '../settings'
import axios from '../utils/axios'
import {
    getAttachmentContentRequest,
    getAttachmentContentSuccess,
    getAttachmentContentFailure,
    uploadAttachmentRequest,
    uploadAttachmentSuccess,
    uploadAttachmentFailure,
    uploadImageRequest,
    uploadImageSuccess,
    uploadImageFailure,
} from '../slices/file'

export function* getAttachment({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(
                settings.FILE_URL + GET_ATTACHMENT,
                payload,
                {
                    headers: setHeader(),
                }
            )
        })

        if (response && response.status === 201) {
            // yield delay(800)
            yield put(getAttachmentContentSuccess(response.data))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error

        yield put(getAttachmentContentFailure(message))
    }
}
export function* uploadAttachment({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(
                settings.FILE_URL + UPLOAD_ATTACHMENT,
                payload,
                {
                    headers: setHeader(),
                }
            )
        })
        if (response && response.status === 201) {
            // yield delay(800)
            yield put(uploadAttachmentSuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(uploadAttachmentFailure(message))
    }
}

export function* uploadImage({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(settings.FILE_URL + UPLOAD_IMAGE, payload, {
                headers: setHeader(),
            })
        })
        if (response && response.status === 201) {
            // yield delay(800)
            yield put(uploadImageSuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(uploadImageFailure(message))
    }
}

export default function* fileSaga() {
    yield takeEvery(getAttachmentContentRequest().type, getAttachment)
    yield takeEvery(uploadAttachmentRequest().type, uploadAttachment)
    yield takeEvery(uploadImageRequest().type, uploadImage)
}
