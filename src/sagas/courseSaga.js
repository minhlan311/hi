import {
    FIND_COURSES_PATH,
    COURSES_PATH,
    TOPIC_PATH,
    PROGRESSIONS_PATH,
    COURSES_QUIZ_PATH,
    JOIN_COURSE_PATH,
} from '../constants/paths'
import { call, put, takeEvery } from 'redux-saga/effects'

import { setHeader } from '../services/api'

import settings from '../settings'
import axios from '../utils/axios'
import {
    getCoursesRequest,
    getCoursesSuccess,
    getCoursesFailure,
    createCoursesRequest,
    createCoursesSuccess,
    createCoursesFailure,
    updateCoursesRequest,
    updateCoursesSuccess,
    updateCoursesFailure,
    deleteCoursesRequest,
    deleteCoursesSuccess,
    deleteCoursesFailure,
    getCourseDetailFailure,
    getCourseDetailRequest,
    getCourseDetailSuccess,
    updateProgressionRequest,
    updateProgressionSuccess,
    updateProgressionFailure,
    getQuizRequest,
    getQuizSuccess,
    getQuizFailure,
    joinCourseRequest,
    joinCourseSuccess,
    joinCourseFailure,
    resetCourseState,
} from '../slices/course'

export function* getCourses({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(settings.API_URL + FIND_COURSES_PATH, payload, {
                headers: setHeader(),
            })
        })
        if (response && response.status === 201) {
            // yield delay(800)
            yield put(getCoursesSuccess(response.data))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error

        yield put(getCoursesFailure(message))
    }
}

export function* createCourses({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(settings.API_URL + COURSES_PATH, payload, {
                headers: setHeader(),
            })
        })
        if (response && response.status === 201) {
            // yield delay(800)
            yield put(createCoursesSuccess(response.data))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error

        yield put(createCoursesFailure(message))
    }
}

export function* updateCourses({ payload }) {
    try {
        const response = yield call(() => {
            return axios.put(
                settings.API_URL + COURSES_PATH + payload.id,
                payload.body,
                {
                    headers: setHeader(),
                }
            )
        })
        if (response && response.status === 200) {
            // yield delay(800)
            yield put(updateCoursesSuccess(response.data))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error

        yield put(updateCoursesFailure(message))
    }
}

export function* deleteCourses({ payload }) {
    try {
        const response = yield call(() => {
            return axios.delete(
                settings.API_URL + COURSES_PATH + payload,
                payload,
                {
                    headers: setHeader(),
                }
            )
        })
        if (response && response.status === 200) {
            // yield delay(800)
            yield put(deleteCoursesSuccess(response.data))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error

        yield put(deleteCoursesFailure(message))
    }
}

export function* getCourseDetail({ payload }) {
    try {
        const response = yield call(() => {
            return axios.get(settings.API_URL + COURSES_PATH + payload, {
                headers: setHeader(),
            })
        })
        if (response && response.status === 200) {
            // yield delay(800)
            yield put(getCourseDetailSuccess(response))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error

        yield put(getCourseDetailFailure(message))
    }
}

// method put

export function* updateProgression({ payload }) {
    try {
        const response = yield call(() => {
            return axios.put(
                settings.API_URL + PROGRESSIONS_PATH + payload.topicId,
                payload,
                {
                    headers: setHeader(),
                }
            )
        })
        if (response && response.status === 200) {
            // yield delay(800)
            yield put(updateProgressionSuccess(response.data))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(updateProgressionFailure(message))
    }
}
export function* getQuiz({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(settings.API_URL + COURSES_QUIZ_PATH, payload, {
                headers: setHeader(),
            })
        })
        if (response && response.status === 201) {
            // yield delay(800)
            yield put(getQuizSuccess(response.data))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(getQuizFailure(message))
    }
}

export function* joinCourse({ payload }) {
    try {
        const response = yield call(() => {
            return axios.post(settings.API_URL + JOIN_COURSE_PATH, payload, {
                headers: setHeader(),
            })
        })
        if (response && response.status === 201) {
            // yield delay(800)
            yield put(joinCourseSuccess(response.data))
        }
    } catch (error) {
        const { message = 'Something went wrong!' } = error
        yield put(joinCourseFailure(message))
    }
}

function* resetCourse() {
    try {
        yield console.log('reset')
    } catch (error) {
        console.log(error)
    }
}

export default function* courseSaga() {
    yield takeEvery(getCoursesRequest().type, getCourses)
    yield takeEvery(createCoursesRequest().type, createCourses)
    yield takeEvery(updateCoursesRequest().type, updateCourses)
    yield takeEvery(deleteCoursesRequest().type, deleteCourses)
    yield takeEvery(getCourseDetailRequest().type, getCourseDetail)
    yield takeEvery(updateProgressionRequest().type, updateProgression)
    yield takeEvery(getQuizRequest().type, getQuiz)
    yield takeEvery(joinCourseRequest().type, joinCourse)
    yield takeEvery(resetCourseState().type, resetCourse)
}
