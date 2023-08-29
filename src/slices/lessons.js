import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

export const ROOT_STATE_NAME = 'lesson'
const initialState = {
    lessons: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
    lessonDetail: {
        data: {},
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },

    createLessonDetail: {
        data: {},
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },

    updateLessonDetail: {
        data: {},
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },

    deleteLessonDetail: {
        data: {},
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
}

const lessonSlice = createSlice({
    name: ROOT_STATE_NAME,
    initialState,
    reducers: {
        getLessonsRequest(state) {
            state.lessons.status = 'loading'
            state.lessons.data = []
        },
        getLessonsSuccess(state, action) {
            state.lessons.data = action.payload
            state.lessons.status = 'success'
        },
        getLessonsFailure(state, action) {
            state.lessons.status = 'failed'
            state.lessons.data = []
            state.lessons.error = action.payload
        },

        getLessonDetailRequest(state) {
            state.lessonDetail.status = 'loading'
            state.lessonDetail.data = []
        },
        getLessonDetailSuccess(state, action) {
            state.lessonDetail.data = action.payload
            state.lessonDetail.status = 'success'
        },
        getLessonDetailFailure(state, action) {
            state.lessonDetail.status = 'failed'
            state.lessonDetail.data = []
            state.lessonDetail.error = action.payload
        },

        createLessonsRequest(state) {
            state.createLessonDetail.status = 'loading'
            state.createLessonDetail.data = []
        },
        createLessonsSuccess(state, action) {
            state.createLessonDetail.data = action.payload
            state.createLessonDetail.status = 'success'
        },
        createLessonsFailure(state, action) {
            state.createLessonDetail.status = 'failed'
            state.createLessonDetail.data = []
            state.createLessonDetail.error = action.payload
        },

        updateLessonsRequest(state) {
            state.updateLessonDetail.status = 'loading'
            state.updateLessonDetail.data = []
        },
        updateLessonsSuccess(state, action) {
            state.updateLessonDetail.data = action.payload
            state.updateLessonDetail.status = 'success'
        },
        updateLessonsFailure(state, action) {
            state.updateLessonDetail.status = 'failed'
            state.updateLessonDetail.data = []
            state.updateLessonDetail.error = action.payload
        },

        deleteLessonsRequest(state) {
            state.deleteLessonDetail.status = 'loading'
            state.deleteLessonDetail.data = []
        },
        deleteLessonsSuccess(state, action) {
            state.deleteLessonDetail.data = action.payload
            state.deleteLessonDetail.status = 'success'
        },
        deleteLessonsFailure(state, action) {
            state.deleteLessonDetail.status = 'failed'
            state.deleteLessonDetail.data = []
            state.deleteLessonDetail.error = action.payload
        },
        resetLessonsState(state) {
            return initialState
        },
    },
})

// Extract the action creators object and the reducer
const { actions, reducer } = lessonSlice
// Export the reducer, either as a default or named export
export default reducer
// Extract and export each action creator by name
export const {
    getLessonsRequest,
    getLessonsSuccess,
    getLessonsFailure,
    getLessonDetailRequest,
    getLessonDetailSuccess,
    getLessonDetailFailure,
    createLessonsRequest,
    createLessonsSuccess,
    createLessonsFailure,
    updateLessonsRequest,
    updateLessonsSuccess,
    updateLessonsFailure,
    deleteLessonsRequest,
    deleteLessonsSuccess,
    deleteLessonsFailure,
    resetLessonsState,
} = actions

// Create and export each selector create by name
export const rootSelector = (state) => state[ROOT_STATE_NAME] || {}

export const lessonsSelector = createSelector(
    rootSelector,
    ({ lessons }) => lessons
)

export const lessonDetailSelector = createSelector(
    rootSelector,
    ({ lessonDetail }) => lessonDetail
)

export const createLessonDetailSelector = createSelector(
    rootSelector,
    ({ createLessonDetail }) => createLessonDetail
)

export const updateLessonDetailSelector = createSelector(
    rootSelector,
    ({ updateLessonDetail }) => updateLessonDetail
)

export const deleteLessonDetailSelector = createSelector(
    rootSelector,
    ({ deleteLessonDetail }) => deleteLessonDetail
)
