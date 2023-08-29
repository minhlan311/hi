import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

export const ROOT_STATE_NAME = 'major'
const initialState = {
    majors: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
    majorDetail: {
        data: {},
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
}

const majorSlice = createSlice({
    name: ROOT_STATE_NAME,
    initialState,
    reducers: {
        getMajorsRequest(state) {
            state.majors.status = 'loading'
            state.majors.data = []
        },
        getMajorsSuccess(state, action) {
            state.majors.data = action.payload
            state.majors.status = 'success'
        },
        getMajorsFailure(state, action) {
            state.majors.status = 'failed'
            state.majors.data = []
            state.majors.error = action.payload
        },

        getMajorDetailRequest(state) {
            state.majorDetail.status = 'loading'
            state.majorDetail.data = {}
        },
        getMajorDetailSuccess(state, action) {
            state.majorDetail.data = action.payload.data
            state.majorDetail.status = 'success'
        },
        getMajorDetailFailure(state, action) {
            state.majorDetail.status = 'failed'
            state.majorDetail.data = {}
            state.majorDetail.error = action.payload
        },
    },
})

// Extract the action creators object and the reducer
const { actions, reducer } = majorSlice
// Export the reducer, either as a default or named export
export default reducer
// Extract and export each action creator by name
export const {
    getMajorsRequest,
    getMajorsSuccess,
    getMajorsFailure,

    getMajorDetailRequest,
    getMajorDetailSuccess,
    getMajorDetailFailure,
} = actions

// Create and export each selector create by name
export const rootSelector = (state) => state[ROOT_STATE_NAME] || {}

export const majorsSelector = createSelector(
    rootSelector,
    ({ majors }) => majors
)
export const majorDetailSelector = createSelector(
    rootSelector,
    ({ majorDetail }) => majorDetail
)
