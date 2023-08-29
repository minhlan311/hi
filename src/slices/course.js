import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

export const ROOT_STATE_NAME = 'course'
const initialState = {
    courses: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
    courseDetail: {
        data: {},
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },

    createCourseDetail: {
        data: {},
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },

    updateCourseDetail: {
        data: {},
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },

    deleteCourseDetail: {
        data: {},
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },

    progression: {
        data: {},
        status: '',
        error: null,
    },
    quiz: {
        data: {},
        status: '',
        error: null,
    },
    joinCourse: {
        data: {},
        status: '',
        error: null,
    },
}

const courseSlice = createSlice({
    name: ROOT_STATE_NAME,
    initialState,
    reducers: {
        getCoursesRequest(state) {
            state.courses.status = 'loading'
            state.courses.data = []
        },
        getCoursesSuccess(state, action) {
            state.courses.status = 'success'
            state.courses.data = action.payload
        },
        getCoursesFailure(state, action) {
            state.courses.status = 'failed'
            state.courses.data = []
            state.courses.error = action.payload
        },

        createCoursesRequest(state) {
            state.createCourseDetail.status = 'loading'
            state.createCourseDetail.data = []
        },
        createCoursesSuccess(state, action) {
            state.createCourseDetail.status = 'success'
            state.createCourseDetail.data = action.payload
        },
        createCoursesFailure(state, action) {
            state.createCourseDetail.status = 'failed'
            state.createCourseDetail.data = []
            state.createCourseDetail.error = action.payload
        },

        updateCoursesRequest(state) {
            state.updateCourseDetail.status = 'loading'
            state.updateCourseDetail.data = []
        },
        updateCoursesSuccess(state, action) {
            state.updateCourseDetail.status = 'success'
            state.updateCourseDetail.data = action.payload
        },
        updateCoursesFailure(state, action) {
            state.updateCourseDetail.status = 'failed'
            state.updateCourseDetail.data = []
            state.updateCourseDetail.error = action.payload
        },

        deleteCoursesRequest(state) {
            state.deleteCourseDetail.status = 'loading'
            state.deleteCourseDetail.data = []
        },
        deleteCoursesSuccess(state, action) {
            state.deleteCourseDetail.status = 'success'
            state.deleteCourseDetail.data = action.payload
        },
        deleteCoursesFailure(state, action) {
            state.deleteCourseDetail.status = 'failed'
            state.deleteCourseDetail.data = []
            state.deleteCourseDetail.error = action.payload
        },

        getCourseDetailRequest(state) {
            state.courseDetail.status = 'loading'
            state.courseDetail.data = {}
        },
        getCourseDetailSuccess(state, action) {
            state.courseDetail.status = 'success'
            state.courseDetail.data = action.payload.data
        },
        getCourseDetailFailure(state, action) {
            state.courseDetail.status = 'failed'
            state.courseDetail.data = {}
            state.courseDetail.error = action.payload
        },

        updateProgressionRequest(state) {
            state.progression.status = 'loading'
            state.progression.data = []
        },
        updateProgressionSuccess(state, action) {
            state.progression.status = 'success'
            state.progression.data = action.payload
        },
        updateProgressionFailure(state, action) {
            state.progression.status = 'failed'
            state.progression.data = []
            state.progression.error = action.payload
        },
        getQuizRequest(state) {
            state.quiz.status = 'loading'
            state.quiz.data = []
        },
        getQuizSuccess(state, action) {
            state.quiz.status = 'success'
            state.quiz.data = action.payload
        },
        getQuizFailure(state, action) {
            state.quiz.status = 'failed'
            state.quiz.data = []
            state.quiz.error = action.payload
        },
        joinCourseRequest(state) {
            state.joinCourse.status = 'loading'
            state.joinCourse.data = []
        },
        joinCourseSuccess(state, action) {
            state.joinCourse.status = 'success'
            state.joinCourse.data = action.payload
        },
        joinCourseFailure(state, action) {
            state.joinCourse.status = 'failed'
            state.joinCourse.data = []
            state.joinCourse.error = action.payload
        },
        resetCourseState(state) {
            return initialState
        },
    },
})

// Extract the action creators object and the reducer
const { actions, reducer } = courseSlice
// Export the reducer, either as a default or named export
export default reducer
// Extract and export each action creator by name
export const {
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

    getCourseDetailRequest,
    getCourseDetailSuccess,
    getCourseDetailFailure,

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
} = actions

// Create and export each selector create by name
export const rootSelector = (state) => state[ROOT_STATE_NAME] || {}

export const coursesSelector = createSelector(
    rootSelector,
    ({ courses }) => courses
)
export const courseDetailSelector = createSelector(
    rootSelector,
    ({ courseDetail }) => courseDetail
)

export const createCourseDetailSelector = createSelector(
    rootSelector,
    ({ createCourseDetail }) => createCourseDetail
)
export const updateCourseDetailSelector = createSelector(
    rootSelector,
    ({ updateCourseDetail }) => updateCourseDetail
)
export const deleteCourseDetailSelector = createSelector(
    rootSelector,
    ({ deleteCourseDetail }) => deleteCourseDetail
)

export const topicSelector = createSelector(
    rootSelector,
    ({ topicDetail }) => topicDetail
)
export const progressionSelector = createSelector(
    rootSelector,
    ({ progression }) => progression
)
export const quizSelector = createSelector(rootSelector, ({ quiz }) => quiz)

export const joinCourseSelector = createSelector(
    rootSelector,
    ({ joinCourse }) => joinCourse
)
