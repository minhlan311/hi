import { call, put, takeEvery } from 'redux-saga/effects'

import { setHeader } from '../services/api'

import settings from '../settings'
import axios from '../utils/axios'
import { FIND_BANNERS_MENTOR_PATH } from '../constants/paths'
import {
    getMentorIntroducesFailure,
    getMentorIntroducesRequest,
    getMentorIntroducesSuccess,
} from '../slices/mentorIntroduce'

export function* getBannerHomePages({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(
                settings.API_URL + FIND_BANNERS_MENTOR_PATH,
                payload,
                {
                    headers: setHeader(),
                }
            )
        })
        if (response && response.status === 201) {
            // yield delay(800)
            yield put(getMentorIntroducesSuccess(response.data.docs))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(getMentorIntroducesFailure(message))
    }
}
export default function* mentorIntroduceSaga() {
    yield takeEvery(getMentorIntroducesRequest().type, getBannerHomePages)
}
