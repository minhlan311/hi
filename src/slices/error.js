import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

export const ROOT_STATE_NAME = 'error'
const initialState = { error: {} }

const errorSilece = createSlice({
    name: ROOT_STATE_NAME,
    initialState,
    reducers: {
        setError(state, action) {
            state.error = action.payload
        },
    },
})

// Extract the action creators object and the reducer
const { actions, reducer } = errorSilece
// Export the reducer, either as a default or named export
export default reducer
// Extract and export each action creator by name
export const { setError } = actions
// Create and export each selector create by name
export const rootSelector = (state) => state[ROOT_STATE_NAME] || {}
export const errorSelector = createSelector(rootSelector, ({ error }) => error)
