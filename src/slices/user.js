import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

export const ROOT_STATE_NAME = 'user'
const initialState = {
    userDetail: {
        data: null,
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
}

const userSlice = createSlice({
    name: ROOT_STATE_NAME,
    initialState,
    reducers: {
        userDetailRequest(state) {
            state.userDetail.status = 'loading'
            state.userDetail.data = null
        },
        userDetailSuccess(state, action) {
            state.userDetail.data = action.payload.data
            state.userDetail.status = 'success'
        },
        userDetailFailure(state, action) {
            state.userDetail.status = 'failed'
            state.userDetail.data = null
            state.userDetail.error = action.payload
        },
        updateUserRequest(state) {
            state.userDetail.status = 'loading'
            state.userDetail.data = null
        },
        updateUserSuccess(state, action) {
            state.userDetail.data = action.payload.data
            state.userDetail.status = 'success'
        },
        updateUserFailure(state, action) {
            state.userDetail.status = 'failed'
            state.userDetail.data = null
            state.userDetail.error = action.payload
        },
        resetUserState(state) {
            return initialState
        },
    },
})

// Extract the action creators object and the reducer
const { actions, reducer } = userSlice
// Export the reducer, either as a default or named export
export default reducer
// Extract and export each action creator by name
export const {
    userDetailRequest,
    userDetailSuccess,
    userDetailFailure,
    updateUserRequest,
    updateUserSuccess,
    updateUserFailure,
    resetUserState,
} = actions

// Create and export each selector create by name
export const rootSelector = (state) => state[ROOT_STATE_NAME] || {}

export const userDetailSelector = createSelector(
    rootSelector,
    ({ userDetail }) => userDetail
)
