import {
    LOGIN_USER_PATH,
    REGISTER_USER_PATH,
    GOOGLE_LOGIN_PATH,
    CHANGE_PASSWORD,
    RESET_PASSWORD,
} from '../constants/paths'
import { call, put, takeLatest } from 'redux-saga/effects'

import { setHeader } from '../services/api'

import { USER_INFO } from '../constants/storageKeys'

import {
    registerUserRequest,
    registerUserSuccess,
    registerUserFailure,
    loginRequest,
    loginSuccess,
    loginFailure,
    googleLoginRequest,
    googleLoginSuccess,
    googleLoginFailure,
    changePasswordRequest,
    changePasswordSuccess,
    changePasswordFailure,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFailure,
} from '../slices/authentication'
import { getStorage, removeStorage, setStorage } from '../services/storage'
import settings from '../settings'
import axios from 'axios'

export function* registerUser({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(settings.AUTH_URL + REGISTER_USER_PATH, payload, {
                headers: setHeader(),
            })
        })
        if (response && response.status === 201) {
            // yield delay(800)
            yield put(registerUserSuccess(response.data))
        }
    } catch (error) {
        yield put(
            registerUserFailure(
                error?.response?.data?.message || 'Something went wrong!'
            )
        )
    }
}

export function* googleLogin({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(settings.AUTH_URL + GOOGLE_LOGIN_PATH, payload, {
                headers: setHeader(),
            })
        })

        if (response && response.status === 201) {
            if (response.data.notRegister) {
                setStorage({
                    key: 'register',
                    val: response.data,
                })
            } else if (response.data._id) {
                setStorage({
                    key: USER_INFO,
                    val: response.data,
                })
                removeStorage('register')
            }
            yield put(googleLoginSuccess(response.data))
        }
    } catch (error) {
        yield put(
            googleLoginFailure(
                error?.response?.data?.message || 'Something went wrong!'
            )
        )
    }
}

export function* loginUser({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(settings.AUTH_URL + LOGIN_USER_PATH, payload, {
                headers: setHeader(),
            })
        })

        if (response && response.status === 201) {
            setStorage({
                key: USER_INFO,
                val: response.data,
            })

            // yield delay(800)
            yield put(loginSuccess(response.data))
        }
    } catch (error) {
        yield put(
            loginFailure(
                error?.response?.data?.message || 'Something went wrong!'
            )
        )
    }
}

export function* changePassword({ payload }) {
    try {
        const response = yield call(() => {
            return axios.put(
                settings.AUTH_URL + CHANGE_PASSWORD + '/' + payload.account,
                payload,
                {
                    headers: setHeader(),
                }
            )
        })

        if (response && response.status === 200) {
            setStorage({
                key: USER_INFO,
                val: response.data,
            })

            // yield delay(800)
            yield put(changePasswordSuccess(response.data))
        }
    } catch (error) {
        yield put(
            changePasswordFailure(
                error?.response?.data?.message || 'Something went wrong!'
            )
        )
    }
}

export function* resetPassword({ payload }) {
    try {
        const response = yield call(() => {
            return axios.put(
                settings.AUTH_URL + RESET_PASSWORD + '/' + payload.account,
                payload,
                {
                    headers: setHeader(),
                }
            )
        })

        if (response && response.status === 200) {
            setStorage({
                key: USER_INFO,
                val: response.data,
            })

            // yield delay(800)
            yield put(resetPasswordSuccess(response.data))
        }
    } catch (error) {
        yield put(
            resetPasswordFailure(
                error?.response?.data?.message || 'Something went wrong!'
            )
        )
    }
}

export default function* authenticationSaga() {
    yield takeLatest(registerUserRequest().type, registerUser)
    yield takeLatest(loginRequest().type, loginUser)
    yield takeLatest(googleLoginRequest().type, googleLogin)
    yield takeLatest(changePasswordRequest().type, changePassword)
    yield takeLatest(resetPasswordRequest().type, resetPassword)
}
