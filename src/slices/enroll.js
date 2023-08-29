import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

export const ROOT_STATE_NAME = 'enroll'
const initialState = {
    listEnroll: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
}

const listEnrollSlice = createSlice({
    name: ROOT_STATE_NAME,
    initialState,
    reducers: {
        getListEnRollRequest(state) {
            state.listEnroll.status = 'loading'
            state.listEnroll.data = []
        },
        getListEnRollSuccess(state, action) {
            state.listEnroll.data = action.payload
            state.listEnroll.status = 'success'
        },
        getListEnRollFailure(state, action) {
            state.listEnroll.status = 'failed'
            state.listEnroll.data = []
            state.listEnroll.error = action.payload
        },
        resetState(state) {
            return initialState
        },
    },
})

// Extract the action creators object and the reducer
const { actions, reducer } = listEnrollSlice
// Export the reducer, either as a default or named export
export default reducer
// Extract and export each action creator by name
export const {
    getListEnRollRequest,
    getListEnRollSuccess,
    getListEnRollFailure,
} = actions

// Create and export each selector create by name
export const rootSelector = (state) => state[ROOT_STATE_NAME] || {}

export const listEnrollSelector = createSelector(
    rootSelector,
    (rootState) => rootState.listEnroll
)
