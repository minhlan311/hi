import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

export const ROOT_STATE_NAME = 'pedagogy'

const initialState = {
    pedagogies: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
    pedagogy: {
        data: {},
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
    deletePedagogy: {
        data: {},
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
    answers: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
    answer: {
        data: {},
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
}

const pedagogySlice = createSlice({
    name: ROOT_STATE_NAME,
    initialState,
    reducers: {
        getPedagogiesRequest(state) {
            state.pedagogies.status = 'loading'
            state.pedagogies.data = []
        },
        getPedagogiesSuccess(state, action) {
            state.pedagogies.data = action.payload
            state.pedagogies.status = 'success'
        },
        getPedagogiesFailure(state, action) {
            state.pedagogies.status = 'failed'
            state.pedagogies.data = []
            state.pedagogies.error = action.payload
        },

        createPedagogyRequest(state) {
            state.pedagogy.status = 'loading'
            state.pedagogy.data = {}
        },
        createPedagogySuccess(state, action) {
            state.pedagogy.data = action.payload
            state.pedagogy.status = 'success'
        },
        createPedagogyFailure(state, action) {
            state.pedagogy.status = 'failed'
            state.pedagogy.data = {}
            state.pedagogy.error = action.payload
        },

        deletePedagogyRequest(state) {
            state.deletePedagogy.status = 'loading'
            state.deletePedagogy.data = {}
        },
        deletePedagogySuccess(state, action) {
            state.deletePedagogy.data = action.payload
            state.deletePedagogy.status = 'success'
        },
        deletePedagogyFailure(state, action) {
            state.deletePedagogy.status = 'failed'
            state.deletePedagogy.data = {}
            state.deletePedagogy.error = action.payload
        },

        getAnswersRequest(state) {
            state.answers.status = 'loading'
            state.answers.data = []
        },
        getAnswersSuccess(state, action) {
            state.answers.data = action.payload
            state.answers.status = 'success'
        },
        getAnswersFailure(state, action) {
            state.answers.status = 'failed'
            state.answers.data = []
            state.answers.error = action.payload
        },

        createAnswerRequest(state) {
            state.answer.status = 'loading'
            state.answer.data = {}
        },
        createAnswerSuccess(state, action) {
            state.answer.data = action.payload
            state.answer.status = 'success'
        },
        createAnswerFailure(state, action) {
            state.answer.status = 'failed'
            state.answer.data = {}
            state.answer.error = action.payload
        },
    },
})

const { actions, reducer } = pedagogySlice

export default reducer

export const {
    getPedagogiesRequest,
    getPedagogiesSuccess,
    getPedagogiesFailure,
    createPedagogyRequest,
    createPedagogySuccess,
    createPedagogyFailure,
    deletePedagogyRequest,
    deletePedagogySuccess,
    deletePedagogyFailure,
    getAnswersRequest,
    getAnswersSuccess,
    getAnswersFailure,
    createAnswerRequest,
    createAnswerSuccess,
    createAnswerFailure,
} = actions

export const rootSelector = (state) => state[ROOT_STATE_NAME] || {}

export const pedagogiesSelector = createSelector(
    rootSelector,
    ({ pedagogies }) => pedagogies
)
export const createPedagogySelector = createSelector(
    rootSelector,
    ({ pedagogy }) => pedagogy
)
export const answersPedagogySelector = createSelector(
    rootSelector,
    ({ answers }) => answers
)
export const deletePedagogySelector = createSelector(
    rootSelector,
    ({ deletePedagogy }) => deletePedagogy
)

export const createAnswerSelector = createSelector(
    rootSelector,
    ({ answer }) => answer
)
