import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

export const ROOT_STATE_NAME = 'authentication'
const initialState = {
    registerUser: {
        data: [],
        status: '',
        error: null,
    },

    loginUser: {
        data: [],
        status: '',
        error: null,
    },

    changePassword: {
        data: [],
        status: '',
        error: null,
    },
    resetPassword: {
        data: [],
        status: '',
        error: null,
    },
}

const authenticationSlice = createSlice({
    name: ROOT_STATE_NAME,
    initialState,
    reducers: {
        registerUserRequest(state) {
            state.registerUser.status = 'loading'
            state.registerUser.data = []
        },
        registerUserSuccess(state, action) {
            state.registerUser.data = action.payload
            state.registerUser.status = 'success'
            state.registerUser.error = null
        },
        registerUserFailure(state, action) {
            state.registerUser.status = 'failed'
            state.registerUser.data = []
            state.registerUser.error = action.payload
        },

        clearRegisterUserRequest(state, _) {
            state.registerUser.status = ''
            state.registerUser.data = []
            state.registerUser.error = null
        },

        loginRequest(state) {
            state.loginUser.status = 'loading'
            state.loginUser.data = []
        },
        loginSuccess(state, action) {
            state.loginUser.data = action.payload
            state.loginUser.status = 'success'
            state.loginUser.error = null
        },
        loginFailure(state, action) {
            state.loginUser.status = 'failed'
            state.loginUser.data = []
            state.loginUser.error = action.payload
        },

        googleLoginRequest(state) {
            state.loginUser.status = 'loading'
            state.loginUser.data = []
        },
        googleLoginSuccess(state, action) {
            state.loginUser.data = action.payload
            state.loginUser.status = 'success'
            state.loginUser.error = null
        },
        googleLoginFailure(state, action) {
            state.loginUser.status = 'failed'
            state.loginUser.data = []
            state.loginUser.error = action.payload
        },

        changePasswordRequest(state) {
            state.changePassword.status = 'loading'
            state.changePassword.data = []
        },
        changePasswordSuccess(state, action) {
            state.changePassword.data = action.payload
            state.changePassword.status = 'success'
            state.changePassword.error = null
        },
        changePasswordFailure(state, action) {
            state.changePassword.status = 'failed'
            state.changePassword.data = []
            state.changePassword.error = action.payload
        },

        resetPasswordRequest(state) {
            state.resetPassword.status = 'loading'
            state.resetPassword.data = []
        },
        resetPasswordSuccess(state, action) {
            state.resetPassword.data = action.payload
            state.resetPassword.status = 'success'
            state.resetPassword.error = null
        },
        resetPasswordFailure(state, action) {
            state.resetPassword.status = 'failed'
            state.resetPassword.data = []
            state.resetPassword.error = action.payload
        },

        updateIsAuthenticated(state, action) {
            state.isAuthenticated = action.payload
        },
    },
})

// Extract the action creators object and the reducer
const { actions, reducer } = authenticationSlice
// Export the reducer, either as a default or named export
export default reducer
// Extract and export each action creator by name
export const {
    registerUserRequest,
    registerUserSuccess,
    registerUserFailure,
    clearRegisterUserRequest,

    loginRequest,
    loginSuccess,
    loginFailure,

    googleLoginRequest,
    googleLoginSuccess,
    googleLoginFailure,

    changePasswordRequest,
    changePasswordSuccess,
    changePasswordFailure,

    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFailure,
} = actions

// Create and export each selector create by name
export const rootSelector = (state) => state[ROOT_STATE_NAME] || {}

export const registerUserSelector = createSelector(
    rootSelector,
    ({ registerUser }) => registerUser
)

export const loginSelector = createSelector(
    rootSelector,
    ({ loginUser }) => loginUser
)

export const changePasswordSelector = createSelector(
    rootSelector,
    ({ changePassword }) => changePassword
)
export const resetPasswordSelector = createSelector(
    rootSelector,
    ({ resetPassword }) => resetPassword
)

export const isAuthenticatedSelector = createSelector(
    rootSelector,
    ({ isAuthenticated }) => isAuthenticated
)
