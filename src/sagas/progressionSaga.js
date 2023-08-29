import { FIND_PROGRESSIONS_PATH } from '../constants/paths'
import { call, put, delay, takeEvery } from 'redux-saga/effects'
import { setHeader } from '../services/api'
import settings from '../settings'
import axios from '../utils/axios'
import {
    getProgressionRequest,
    getProgressionSuccess,
    getProgressionFailure,
} from '../slices/progression'
export function* getProgression({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(
                settings.API_URL + FIND_PROGRESSIONS_PATH,
                payload,
                {
                    headers: setHeader(),
                }
            )
        })
        if (response && response.status === 201) {
            yield delay(800)
            yield put(getProgressionSuccess(response.data))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(getProgressionFailure(message))
    }
}

export default function* progressionSaga() {
    yield takeEvery(getProgressionRequest().type, getProgression)
}
