import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

export const ROOT_STATE_NAME = 'activationCode'
const initialState = {
    listCode: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
    addCode: {
        data: {},
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
    deleteCode: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
    nextStep: false,
}

const listCodeSlice = createSlice({
    name: ROOT_STATE_NAME,
    initialState,
    reducers: {
        getListCodeRequest(state) {
            state.listCode.status = 'loading'
            state.listCode.data = []
        },
        getListCodeSuccess(state, action) {
            state.listCode.data = action.payload
            state.listCode.status = 'success'
        },
        getListCodeFailure(state, action) {
            state.listCode.status = 'failed'
            state.listCode.data = []
            state.listCode.error = action.payload
        },
        addCodeRequest(state) {
            state.addCode.status = 'loading'
            state.addCode.data = {}
        },
        addCodeSuccess(state, action) {
            state.addCode.data = action.payload
            state.addCode.status = 'success'
        },
        addCodeFailure(state, action) {
            state.addCode.status = 'failed'
            state.addCode.data = {}
            state.addCode.error = action.payload
        },
        deleteCodeRequest(state) {
            state.deleteCode.status = 'loading'
            state.deleteCode.data = {}
        },
        deleteCodeSuccess(state, action) {
            state.deleteCode.data = action.payload
            state.deleteCode.status = 'success'
        },
        deleteCodeFailure(state, action) {
            state.deleteCode.status = 'failed'
            state.deleteCode.data = []
            state.deleteCode.error = action.payload
        },
        resetSate(state) {
            state.addCode.status = ''
            state.addCode.data = {}
        },
        setNextStep: (state, { payload }) => {
            state.nextStep = payload
        },
        clearNextStep: (state) => {
            state.nextStep = false
        },
    },
})

// Extract the action creators object and the reducer
const { actions, reducer } = listCodeSlice
// Export the reducer, either as a default or named export
export default reducer
// Extract and export each action creator by name
export const {
    getListCodeRequest,
    getListCodeSuccess,
    getListCodeFailure,

    addCodeRequest,
    addCodeSuccess,
    addCodeFailure,

    deleteCodeRequest,
    deleteCodeSuccess,
    deleteCodeFailure,

    setNextStep,
    clearNextStep,
    resetSate,
} = actions

// Create and export each selector create by name
export const rootSelector = (state) => state[ROOT_STATE_NAME] || {}

export const listCodeSelector = createSelector(
    rootSelector,
    ({ listCode }) => listCode
)

export const addCodeSelector = createSelector(
    rootSelector,
    ({ addCode }) => addCode
)

export const deleteCodeSelector = createSelector(
    rootSelector,
    ({ deleteCode }) => deleteCode
)
