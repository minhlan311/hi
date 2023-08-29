import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

export const ROOT_STATE_NAME = 'payment'
const initialState = {
    payment: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
    callback: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
}

const paymentSlice = createSlice({
    name: ROOT_STATE_NAME,
    initialState,
    reducers: {
        createPaymentRequest(state) {
            state.payment.status = 'loading'
            state.payment.data = []
        },
        createPaymentSuccess(state, action) {
            state.payment.data = action.payload
            state.payment.status = 'success'
        },
        createPaymentFailure(state, action) {
            state.payment.status = 'failed'
            state.payment.data = []
            state.payment.error = action.payload
        },
        callBackPaymentRequest(state) {
            state.callback.status = 'loading'
            state.callback.data = []
        },
        callBackPaymentSuccess(state, action) {
            state.callback.data = action.payload
            state.callback.status = 'success'
        },
        callBackPaymentFailure(state, action) {
            state.callback.status = 'failed'
            state.callback.data = []
            state.callback.error = action.payload
        },
    },
})

// Extract the action creators object and the reducer
const { actions, reducer } = paymentSlice
// Export the reducer, either as a default or named export
export default reducer
// Extract and export each action creator by name
export const {
    createPaymentRequest,
    createPaymentSuccess,
    createPaymentFailure,
    callBackPaymentRequest,
    callBackPaymentSuccess,
    callBackPaymentFailure
} = actions

// Create and export each selector create by name
export const rootSelector = (state) => state[ROOT_STATE_NAME] || {}

export const paymentSelector = createSelector(
    rootSelector,
    ({ payment }) => payment
)

export const callbackSelector = createSelector(
    rootSelector,
    ({ callback }) => callback
)
