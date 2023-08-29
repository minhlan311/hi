import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

export const ROOT_STATE_NAME = 'subjects'
const initialState = {
    subjects: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
    subjectDetail: {
        data: {},
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
}

const subjectSlice = createSlice({
    name: ROOT_STATE_NAME,
    initialState,
    reducers: {
        findSubjectRequest(state) {
            state.subjects.status = 'loading'
            state.subjects.data = []
        },
        findSubjectSuccess(state, action) {
            state.subjects.data = action.payload
            state.subjects.status = 'success'
        },
        findSubjectFailure(state, action) {
            state.subjects.status = 'failed'
            state.subjects.data = []
            state.subjects.error = action.payload
        },
        subjectDetailRequest(state) {
            state.subjectDetail.status = 'loading'
            state.subjectDetail.data = []
        },
        subjectDetailSuccess(state, action) {
            state.subjectDetail.data = action.payload
            state.subjectDetail.status = 'success'
        },
        subjectDetailFailure(state, action) {
            state.subjectDetail.status = 'failed'
            state.subjectDetail.data = []
            state.subjectDetail.error = action.payload
        },
    },
})

// Extract the action creators object and the reducer
const { actions, reducer } = subjectSlice
// Export the reducer, either as a default or named export
export default reducer
// Extract and export each action creator by name
export const {
    findSubjectRequest,
    findSubjectSuccess,
    findSubjectFailure,
    subjectDetailRequest,
    subjectDetailSuccess,
    subjectDetailFailure,
} = actions

// Create and export each selector create by name
export const rootSelector = (state) => state[ROOT_STATE_NAME] || {}

export const subjectsSelector = createSelector(
    rootSelector,
    (rootState) => rootState.subjects
)
export const subjectsDetailSelector = createSelector(
    rootSelector,
    (rootState) => rootState.subjectDetail
)
