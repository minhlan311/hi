import { FIND_CATEGORIES_PATH, CATEGORIES_PATH } from '../constants/paths'
import { call, put, takeEvery } from 'redux-saga/effects'

import { setHeader } from '../services/api'

import settings from '../settings'
import axios from '../utils/axios'
import {
    getCategoriesRequest,
    getCategoriesSuccess,
    getCategoriesFailure,
    getCategoryDetailRequest,
    getCategoryDetailSuccess,
    getCategoryDetailFailure,
} from '../slices/category'

export function* getCategories({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(
                settings.API_URL + FIND_CATEGORIES_PATH,
                payload,
                {
                    headers: setHeader(),
                }
            )
        })

        if (response && response.status === 201) {
            // yield delay(800)
            yield put(getCategoriesSuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(getCategoriesFailure(message))
    }
}

export function* getCategoryDetail({ payload }) {
    try {
        const response = yield call(() => {
            return axios.get(
                settings.API_URL + CATEGORIES_PATH + payload,
                {
                    headers: setHeader(),
                }
            )
        })
        if (response && response.status === 200) {
            // yield delay(800)
            yield put(getCategoryDetailSuccess(response.data))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(getCategoryDetailFailure(message))
    }
}

export default function* categorySaga() {
    yield takeEvery(getCategoriesRequest().type, getCategories)
    yield takeEvery(getCategoryDetailRequest().type, getCategoryDetail)
}
