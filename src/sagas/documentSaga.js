import { FIND_DOCUMENTS_PATH, DOCUMENTS_PATH } from '../constants/paths'
import { call, put, takeEvery } from 'redux-saga/effects'
import { setHeader } from '../services/api'
import settings from '../settings'
import axios from '../utils/axios'
import {
    getDocumentsRequest,
    getDocumentsSuccess,
    getDocumentsFailure,
    getDocumentDetailFailure,
    getDocumentDetailRequest,
    getDocumentDetailSuccess,
    createDocumentRequest,
    createDocumentSuccess,
    createDocumentFailure,
    downloadDocumentRequest,
    downloadDocumentSuccess,
    downloadDocumentFailure,
    deleteDocumentRequest,
    deleteDocumentSuccess,
    deleteDocumentFailure,
    updateDocumentFailure,
    updateDocumentRequest,
    updateDocumentSuccess,
    resetDocumentState,
} from '../slices/document'
export function* getDocuments({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(settings.API_URL + FIND_DOCUMENTS_PATH, payload, {
                headers: setHeader(),
            })
        })
        if (response && response.status === 201) {
            // yield delay(800)
            yield put(getDocumentsSuccess(response.data))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(getDocumentsFailure(message))
    }
}
export function* getDocumentDetail({ payload }) {
    try {
        const response = yield call(() => {
            return axios.get(settings.API_URL + DOCUMENTS_PATH + payload, {
                headers: setHeader(),
            })
        })

        if (response && response.status === 200) {
            // yield delay(800)
            yield put(getDocumentDetailSuccess(response.data))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(getDocumentDetailFailure(message))
    }
}

export function* createDocument({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(settings.API_URL + DOCUMENTS_PATH, payload, {
                headers: setHeader(),
            })
        })
        if (response && response.status === 201) {
            // yield delay(800)
            yield put(createDocumentSuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(createDocumentFailure(message))
    }
}

export function* downloadDocument({ payload }) {
    try {
        const response = yield call(() => {
            return axios.patch(
                settings.API_URL + DOCUMENTS_PATH + 'download/' + payload,
                {
                    headers: setHeader(),
                }
            )
        })
        if (response && response.status === 200) {
            // yield delay(800)
            yield put(downloadDocumentSuccess(response.data))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(downloadDocumentFailure(message))
    }
}

export function* deleteDocument({ payload }) {
    try {
        const response = yield call(() => {
            return axios.delete(settings.API_URL + DOCUMENTS_PATH + payload, {
                headers: setHeader(),
            })
        })
        if (response && response.status === 200) {
            // yield delay(800)
            yield put(deleteDocumentSuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(deleteDocumentFailure(message))
    }
}

export function* updateDocument({ payload }) {
    try {
        const response = yield call(() => {
            return axios.put(
                settings.API_URL + DOCUMENTS_PATH + payload.id,
                payload,
                {
                    headers: setHeader(),
                }
            )
        })
        if (response && response.status === 200) {
            // yield delay(800)
            yield put(updateDocumentSuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(updateDocumentFailure(message))
    }
}

function* resetDocument() {
    try {
        yield console.log('reset')
    } catch (error) {
        console.log(error)
    }
}
export default function* documentSaga() {
    yield takeEvery(createDocumentRequest().type, createDocument)
    yield takeEvery(getDocumentsRequest().type, getDocuments)
    yield takeEvery(getDocumentDetailRequest().type, getDocumentDetail)
    yield takeEvery(deleteDocumentRequest().type, deleteDocument)
    yield takeEvery(downloadDocumentRequest().type, downloadDocument)
    yield takeEvery(updateDocumentRequest().type, updateDocument)
    yield takeEvery(resetDocumentState().type, resetDocument)
}
