import {
    PAYMENT_CALLBACK_PATH, PAYMENT_CHECKOUT_POINT,
} from '../constants/paths'
import { call, put, takeEvery } from 'redux-saga/effects'

import { setHeader } from '../services/api'

import settings from '../settings'
import axios from '../utils/axios'
import {
    createPaymentRequest,
    createPaymentSuccess,
    createPaymentFailure,
    callBackPaymentRequest,
    callBackPaymentSuccess,
    callBackPaymentFailure,
} from '../slices/payment'

export function* createPayment({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(
                settings.API_URL + PAYMENT_CHECKOUT_POINT,
                payload,
                {
                    headers: setHeader(),
                }
            )
        })
        if (response && response.status === 201) {
            // yield delay(800)
            yield put(createPaymentSuccess(response.data?.url))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error

        yield put(createPaymentFailure(message))
    }
}

export function* callbackPayment({payload}) {
    try {
        const response = yield call(() => {
            return axios.post(
                settings.API_URL + PAYMENT_CALLBACK_PATH,
                payload,
                {
                    headers: setHeader(),
                }
            )
        })
        if (response && response.status === 201) {
            yield put(callBackPaymentSuccess(response.data))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error

        yield put(callBackPaymentFailure(message))
    }
}

export default function* paymentSaga() {
    yield takeEvery(createPaymentRequest().type, createPayment)
    yield takeEvery(callBackPaymentRequest().type, callbackPayment)
}
