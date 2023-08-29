import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

export const ROOT_STATE_NAME = 'announcement'
const initialState = {
    anonouncement: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
}

const anonouncementSlice = createSlice({
    name: ROOT_STATE_NAME,
    initialState,
    reducers: {
        getAnonouncementRequest(state) {
            state.anonouncement.status = 'loading'
            state.anonouncement.data = []
        },
        getAnonouncementSuccess(state, action) {
            state.anonouncement.data = action.payload
            state.anonouncement.status = 'success'
        },
        getAnonouncementFailure(state, action) {
            state.anonouncement.status = 'failed'
            state.anonouncement.data = []
            state.anonouncement.error = action.payload
        },
    },
})

// Extract the action creators object and the reducer
const { actions, reducer } = anonouncementSlice
// Export the reducer, either as a default or named export
export default reducer
// Extract and export each action creator by name
export const {
    getAnonouncementRequest,
    getAnonouncementSuccess,
    getAnonouncementFailure,
} = actions

// Create and export each selector create by name
export const rootSelector = (state) => state[ROOT_STATE_NAME] || {}

export const anonouncementSelector = createSelector(
    rootSelector,
    ({anonouncement}) => anonouncement
)

