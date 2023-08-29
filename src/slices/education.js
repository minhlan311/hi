import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

export const ROOT_STATE_NAME = 'education'
const initialState = {
    educations: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
    educationDetail: {
        data: {},
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
}

const educationSlice = createSlice({
    name: ROOT_STATE_NAME,
    initialState,
    reducers: {
        getEducationsRequest(state) {
            state.educations.status = 'loading'
            state.educations.data = []
        },
        getEducationsSuccess(state, action) {
            state.educations.data = action.payload
            state.educations.status = 'success'
        },
        getEducationsFailure(state, action) {
            state.educations.status = 'failed'
            state.educations.data = []
            state.educations.error = action.payload
        },

        getEducationDetailRequest(state) {
            state.educationDetail.status = 'loading'
            state.educationDetail.data = {}
        },
        getEducationDetailSuccess(state, action) {
            state.educationDetail.data = action.payload.data
            state.educationDetail.status = 'success'
        },
        getEducationDetailFailure(state, action) {
            state.educationDetail.status = 'failed'
            state.educationDetail.data = {}
            state.educationDetail.error = action.payload
        },
    },
})

// Extract the action creators object and the reducer
const { actions, reducer } = educationSlice
// Export the reducer, either as a default or named export
export default reducer
// Extract and export each action creator by name
export const {
    getEducationsRequest,
    getEducationsSuccess,
    getEducationsFailure,

    getEducationDetailRequest,
    getEducationDetailSuccess,
    getEducationDetailFailure,
} = actions

// Create and export each selector create by name
export const rootSelector = (state) => state[ROOT_STATE_NAME] || {}

export const educationsSelector = createSelector(
    rootSelector,
    ({ educations }) => educations
)
export const educationDetailSelector = createSelector(
    rootSelector,
    ({ educationDetail }) => educationDetail
)
