import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

export const ROOT_STATE_NAME = 'transaction'
const initialState = {
    transactions: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
}

const transactionSlice = createSlice({
    name: ROOT_STATE_NAME,
    initialState,
    reducers: {
        findTransactionRequest(state) {
            state.transactions.status = 'loading'
            state.transactions.data = []
        },
        findTransactionSuccess(state, action) {
            state.transactions.data = action.payload
            state.transactions.status = 'success'
        },
        findTransactionFailure(state, action) {
            state.transactions.status = 'failed'
            state.transactions.data = []
            state.transactions.error = action.payload
        },
        transactionRequest(state) {
            state.transactions.status = 'loading'
            state.transactions.data = []
        },
        transactionSuccess(state, action) {
            state.transactions.data = action.payload
            state.transactions.status = 'success'
        },
        transactionFailure(state, action) {
            state.transactions.status = 'failed'
            state.transactions.data = []
            state.transactions.error = action.payload
        },
    },
})

// Extract the action creators object and the reducer
const { actions, reducer } = transactionSlice
// Export the reducer, either as a default or named export
export default reducer
// Extract and export each action creator by name
export const {
    findTransactionRequest,
    findTransactionSuccess,
    findTransactionFailure,
    transactionRequest,
    transactionSuccess,
    transactionFailure,
} = actions

// Create and export each selector create by name
export const rootSelector = (state) => state[ROOT_STATE_NAME] || {}

export const transactionSelector = createSelector(
    rootSelector,
    (rootState) => rootState.transactions
)
