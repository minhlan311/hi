import { USER_PATH } from '../constants/paths'
import { call, put, delay, takeLatest } from 'redux-saga/effects'
import { setHeader } from '../services/api'
import settings from '../settings'
import axios from '../utils/axios'
import {
    userDetailFailure,
    userDetailRequest,
    userDetailSuccess,
    updateUserFailure,
    updateUserRequest,
    updateUserSuccess,
    resetUserState,
} from '../slices/user'
import { getStorage } from '../services/storage'
import { USER_INFO } from '../constants/storageKeys'

const user = getStorage(USER_INFO)
export function* userDetail({ payload }) {
    try {
        const response = yield call(() => {
            return axios.get(settings.API_URL + USER_PATH + payload, payload, {
                headers: setHeader(),
            })
        })
        //   const user = yield response.json();
        //   yield put(userDetailSuccess(user));
        if (response && response.status === 200) {
            yield delay(800)
            yield put(userDetailSuccess(response))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(userDetailFailure(message))
    }
}

export function* updateUser({ payload }) {
    try {
        const response = yield call(() => {
            return axios.put(settings.API_URL + USER_PATH + user._id, payload, {
                headers: setHeader(),
            })
        })
        if (response && response.status === 200) {
            yield delay(800)
            yield put(updateUserSuccess(response))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error

        yield put(updateUserFailure(message))
    }
}
function* resetUser() {
    try {
        yield console.log('reset')
    } catch (error) {
        console.log(error)
    }
}
export default function* userSaga() {
    yield takeLatest(userDetailRequest().type, userDetail)
    yield takeLatest(updateUserRequest().type, updateUser)
    yield takeLatest(resetUserState().type, resetUser)
}
