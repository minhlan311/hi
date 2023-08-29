import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

export const ROOT_STATE_NAME = 'loading'
const initialState = {
    totalRequestStart: 0,
    totalRequestFinish: 0,
}

const loadingSlice = createSlice({
    name: ROOT_STATE_NAME,
    initialState,
    reducers: {
        sendLoadingRequest(state) {
            state.totalRequestStart = state.totalRequestStart + 1
        },
        finishLoadingRequest(state) {
            state.totalRequestFinish = state.totalRequestFinish + 1
        },
        clearLoadingRequest(state) {
            state.totalRequestStart = 0
            state.totalRequestFinish = 0
        },
    },
})

// Extract the action creators object and the reducer
const { actions, reducer } = loadingSlice
// Export the reducer, either as a default or named export
export default reducer
// Extract and export each action creator by name
export const { sendLoadingRequest, finishLoadingRequest, clearLoadingRequest } =
    actions
// Create and export each selector create by name
export const rootSelector = (state) => state[ROOT_STATE_NAME] || {}

export const loadingSelector = createSelector(
    rootSelector,
    ({ loadingRequest }) => loadingRequest
)
