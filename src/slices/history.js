import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

export const ROOT_STATE_NAME = 'history'
const initialState = {
    history: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
}

const historySlice = createSlice({
    name: ROOT_STATE_NAME,
    initialState,
    reducers: {
        getHistoryRequest(state) {
            state.history.status = 'loading'
            state.history.data = null
        },
        getHistorySuccess(state, action) {
            state.history.data = action.payload.data
            state.history.status = 'success'
        },
        getHistoryFailure(state, action) {
            state.history.status = 'failed'
            state.history.data = null
            state.history.error = action.payload
        },
        updateHistoryRequest(state) {
            state.history.status = 'loading'
            state.history.data = null
        },
        updateHistorySuccess(state, action) {
            state.history.data = action.payload.data
            state.history.status = 'success'
        },
        updateHistoryFailure(state, action) {
            state.history.status = 'failed'
            state.history.data = null
            state.history.error = action.payload
        },
    },
})

// Extract the action creators object and the reducer
const { actions, reducer } = historySlice
// Export the reducer, either as a default or named export
export default reducer
// Extract and export each action creator by name
export const {
    getHistoryRequest,
    getHistorySuccess,
    getHistoryFailure,
    updateHistoryRequest,
    updateHistorySuccess,
    updateHistoryFailure,
} = actions

// Create and export each selector create by name
export const rootSelector = (state) => state[ROOT_STATE_NAME] || {}

export const historySelector = createSelector(
    rootSelector,
    ({ history }) => history
)
