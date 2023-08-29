import { ANNOUNCEMENT_PATH } from '../constants/paths'
import { call, put, takeEvery } from 'redux-saga/effects'

import { setHeader } from '../services/api'

import settings from '../settings'
import axios from '../utils/axios'
import {
    getAnonouncementFailure,
    getAnonouncementRequest,
    getAnonouncementSuccess,
} from '../slices/announcement'

export function* getAnonouncement({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(
                settings.API_URL + ANNOUNCEMENT_PATH,
                payload,
                {
                    headers: setHeader(),
                }
            )
        })

        if (response && response.status === 201) {
            // yield delay(800)
            yield put(getAnonouncementSuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(getAnonouncementFailure(message))
    }
}


export default function* announcementSaga() {
    yield takeEvery(getAnonouncementRequest().type,getAnonouncement)
}
