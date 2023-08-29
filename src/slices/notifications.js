import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

export const ROOT_STATE_NAME = 'notification'
const initialState = {
    notifications: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
}

const notificationSlice = createSlice({
    name: ROOT_STATE_NAME,
    initialState,
    reducers: {
        getNotificationRequest(state) {
            state.notifications.status = 'loading'
            state.notifications.data = []
        },
        getNotificationSuccess(state, action) {
            state.notifications.data = action.payload
            state.notifications.status = 'success'
        },
        getNotificationFailure(state, action) {
            state.notifications.status = 'failed'
            state.notifications.data = []
            state.notifications.error = action.payload
        },
        putNotificationRequest(state) {
            state.notifications.status = 'loading'
            state.notifications.data = []
        },
        putNotificationSuccess(state, action) {
            state.notifications.data = action.payload
            state.notifications.status = 'success'
        },
        putNotificationFailure(state, action) {
            state.notifications.status = 'failed'
            state.notifications.data = []
            state.notifications.error = action.payload
        },
    },
})

// Extract the action creators object and the reducer
const { actions, reducer } = notificationSlice
// Export the reducer, either as a default or named export
export default reducer
// Extract and export each action creator by name
export const {
    getNotificationRequest,
    getNotificationSuccess,
    getNotificationFailure,
    putNotificationRequest,
    putNotificationSuccess,
    putNotificationFailure,
} = actions

// Create and export each selector create by name
export const rootSelector = (state) => state[ROOT_STATE_NAME] || {}

export const notificationSelector = createSelector(
    rootSelector,
    (rootState) => rootState.notifications
)
