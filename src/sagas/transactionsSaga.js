import { FIND_TRANSACTION_PATH, TRANSACTION_PATH } from '../constants/paths'
import { call, put, takeEvery } from 'redux-saga/effects'

import { setHeader } from '../services/api'

import settings from '../settings'
import axios from '../utils/axios'
import {
    findTransactionRequest,
    findTransactionSuccess,
    findTransactionFailure,
    transactionRequest,
    transactionSuccess,
    transactionFailure,
} from '../slices/transactions'

export function* findTransaction({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(
                settings.API_URL + FIND_TRANSACTION_PATH,
                payload,
                {
                    headers: setHeader(),
                }
            )
        })

        if (response && response.status === 201) {
            // yield delay(800)
            yield put(findTransactionSuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(findTransactionFailure(message))
    }
}

export function* postTransaction({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(settings.API_URL + TRANSACTION_PATH, payload, {
                headers: setHeader(),
            })
        })

        if (response && response.status === 201) {
            yield put(
                transactionSuccess({
                    message: response?.data?.message,
                    status: response.status,
                })
            )
        }
    } catch (error) {
        yield put(
            transactionFailure({
                message: error?.response?.data?.message,
                status: error?.response.status,
            })
        )
    }
}

export default function* enrollSaga() {
    yield takeEvery(findTransactionRequest().type, findTransaction)
    yield takeEvery(transactionRequest().type, postTransaction)
}
