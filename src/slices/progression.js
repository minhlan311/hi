import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

export const ROOT_STATE_NAME = 'progression'
const initialState = {
    progression: {
        data: [],
        status: '', // or: 'loading', 'succeeded', 'failed'
        error: null,
    },
}

const progressionSlice = createSlice({
    name: ROOT_STATE_NAME,
    initialState,
    reducers: {
        getProgressionRequest(state) {
            state.progression.status = 'loading'
            state.progression.data = []
        },
        getProgressionSuccess(state, action) {
            state.progression.data = action.payload
            state.progression.status = 'succeeded'
        },
        getProgressionFailure(state, action) {
            state.progression.status = 'failed'
            state.progression.data = []
            state.progression.error = action.payload
        },
    },
})

// Extract the action creators object and the reducer
const { actions, reducer } = progressionSlice
// Export the reducer, either as a default or named export
export default reducer
// Extract and export each action creator by name
export const {
    getProgressionRequest,
    getProgressionSuccess,
    getProgressionFailure,
} = actions

// Create and export each selector create by name
export const rootSelector = (state) => state[ROOT_STATE_NAME] || {}

export const progressionSelector = createSelector(
    rootSelector,
    ({ progression }) => progression
)
