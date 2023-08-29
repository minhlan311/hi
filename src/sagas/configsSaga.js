import { CONFIGS_PATH } from '../constants/paths'
import { call, put, takeEvery } from 'redux-saga/effects'
import { setHeader } from '../services/api'
import settings from '../settings'
import axios from '../utils/axios'
import {
    getconfigsRequest,
    getconfigsSuccess,
    getconfigsFailure,
} from '../slices/configs'

export function* getConfigs({ payload }) {
    try {
        const response = yield call(() => {
            return axios.get(settings.API_URL + CONFIGS_PATH, payload, {
                headers: setHeader(),
            })
        })

        if (response && response.status === 200) {
            yield put(getconfigsSuccess(response.data))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(getconfigsFailure(message))
    }
}

export default function* categorySaga() {
    yield takeEvery(getconfigsRequest().type, getConfigs)
}
