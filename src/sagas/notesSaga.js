import { FIND_NOTE_PATH, NOTE_PATH } from '../constants/paths'
import { call, put, takeEvery } from 'redux-saga/effects'

import { setHeader } from '../services/api'

import settings from '../settings'
import axios from '../utils/axios'
import {
    getNotesFailure,
    getNotesRequest,
    getNotesSuccess,
    getNoteDetailRequest,
    getNoteDetailSuccess,
    getNoteDetailFailure,
    createNotesRequest,
    createNotesSuccess,
    createNotesFailure,
    updateNotesRequest,
    updateNotesSuccess,
    updateNotesFailure,
    deleteNotesRequest,
    deleteNotesSuccess,
    deleteNotesFailure,
    resetNotesState,
} from '../slices/notes'

export function* getNotes({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(settings.API_URL + FIND_NOTE_PATH, payload, {
                headers: setHeader(),
            })
        })
        if (response && response.status === 201) {
            // yield delay(800)
            yield put(getNotesSuccess(response.data))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error

        yield put(getNotesFailure(message))
    }
}

export function* getNoteDetail({ payload }) {
    try {
        const response = yield call(() => {
            return axios.get(settings.API_URL + NOTE_PATH + '/' + payload, {
                headers: setHeader(),
            })
        })
        if (response && response.status === 200) {
            // yield delay(800)
            yield put(getNoteDetailSuccess(response.data))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error

        yield put(getNoteDetailFailure(message))
    }
}

export function* createNotes({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(settings.API_URL + NOTE_PATH, payload, {
                headers: setHeader(),
            })
        })
        if (response && response.status === 201) {
            // yield delay(800)
            yield put(createNotesSuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error

        yield put(createNotesFailure(message))
    }
}

export function* updateNote({ payload }) {
    try {
        const response = yield call(() => {
            return axios.put(
                settings.API_URL + NOTE_PATH + '/' + payload.id,
                payload.body,
                {
                    headers: setHeader(),
                }
            )
        })
        if (response && response.status === 200) {
            // yield delay(800)
            yield put(updateNotesSuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error

        yield put(updateNotesFailure(message))
    }
}

export function* deleteNote({ payload }) {
    try {
        const response = yield call(() => {
            return axios.delete(settings.API_URL + NOTE_PATH + '/' + payload, {
                headers: setHeader(),
            })
        })
        if (response && response.status === 200) {
            // yield delay(800)
            yield put(deleteNotesSuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error

        yield put(deleteNotesFailure(message))
    }
}

function* resetNotes() {
    try {
        yield console.log('reset')
    } catch (error) {
        console.log(error)
    }
}

export default function* noteSaga() {
    yield takeEvery(getNotesRequest().type, getNotes)
    yield takeEvery(getNoteDetailRequest().type, getNoteDetail)
    yield takeEvery(createNotesRequest().type, createNotes)
    yield takeEvery(updateNotesRequest().type, updateNote)
    yield takeEvery(deleteNotesRequest().type, deleteNote)
    yield takeEvery(resetNotesState().type, resetNotes)
}
