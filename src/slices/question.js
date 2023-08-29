import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

export const ROOT_STATE_NAME = 'question'
const initialState = {
    questions: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
    questionDetail: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
    importQuestion: {
        data: {},
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
    createQuestion: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
    updateQuestion: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
    deleteQuestion: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
}
const questionSlice = createSlice({
    name: ROOT_STATE_NAME,
    initialState,
    reducers: {
        getQuestionsRequest(state) {
            state.questions.status = 'loading'
            state.questions.data = []
        },
        getQuestionsSuccess(state, action) {
            state.questions.data = action.payload
            state.questions.status = 'success'
        },
        getQuestionsFailure(state, action) {
            state.questions.status = 'failed'
            state.questions.data = []
            state.questions.error = action.payload
        },

        getQuestionDetailRequest(state) {
            state.questionDetail.status = 'loading'
            state.questionDetail.data = []
        },
        getQuestionDetailSuccess(state, action) {
            state.questionDetail.data = action.payload
            state.questionDetail.status = 'success'
        },
        getQuestionDetailFailure(state, action) {
            state.questionDetail.status = 'failed'
            state.questionDetail.data = []
            state.questionDetail.error = action.payload
        },

        importQuestionRequest(state) {
            state.importQuestion.status = 'loading'
            state.importQuestion.data = {}
        },
        importQuestionSuccess(state, action) {
            state.importQuestion.data = action.payload
            state.importQuestion.status = 'success'
        },
        importQuestionFailure(state, action) {
            state.importQuestion.status = 'failed'
            state.importQuestion.data = {}
            state.importQuestion.error = action.payload
        },

        createQuestionRequest(state) {
            state.createQuestion.status = 'loading'
            state.createQuestion.data = []
        },
        createQuestionSuccess(state, action) {
            state.createQuestion.data = action.payload
            state.createQuestion.status = 'success'
        },
        createQuestionFailure(state, action) {
            state.createQuestion.status = 'failed'
            state.createQuestion.data = []
            state.createQuestion.error = action.payload
        },

        updateQuestionRequest(state) {
            state.updateQuestion.status = 'loading'
            state.updateQuestion.data = []
        },
        updateQuestionSuccess(state, action) {
            state.updateQuestion.data = action.payload
            state.updateQuestion.status = 'success'
        },
        updateQuestionFailure(state, action) {
            state.updateQuestion.status = 'failed'
            state.updateQuestion.data = []
            state.updateQuestion.error = action.payload
        },

        deleteQuestionRequest(state) {
            state.deleteQuestion.status = 'loading'
            state.deleteQuestion.data = []
        },
        deleteQuestionSuccess(state, action) {
            state.deleteQuestion.data = action.payload
            state.deleteQuestion.status = 'success'
        },
        deleteQuestionFailure(state, action) {
            state.deleteQuestion.status = 'failed'
            state.deleteQuestion.data = []
            state.deleteQuestion.error = action.payload
        },
        resetQuestionState(state) {
            return initialState
        },
    },
})

const { actions, reducer } = questionSlice

export default reducer

export const {
    getQuestionsRequest,
    getQuestionsSuccess,
    getQuestionsFailure,
    getQuestionDetailRequest,
    getQuestionDetailSuccess,
    getQuestionDetailFailure,
    createQuestionRequest,
    createQuestionSuccess,
    createQuestionFailure,
    updateQuestionRequest,
    updateQuestionSuccess,
    updateQuestionFailure,
    deleteQuestionRequest,
    deleteQuestionSuccess,
    deleteQuestionFailure,
    importQuestionRequest,
    importQuestionSuccess,
    importQuestionFailure,
    resetQuestionState,
} = actions

// Create and export each selector create by name
export const rootSelector = (state) => state[ROOT_STATE_NAME] || {}

export const questionsSelector = createSelector(
    rootSelector,
    ({ questions }) => questions
)

export const questionDetailSelector = createSelector(
    rootSelector,
    ({ questionDetail }) => questionDetail
)
export const createQuestionDataSelector = createSelector(
    rootSelector,
    ({ createQuestion }) => createQuestion
)
export const updateQuestionDataSelector = createSelector(
    rootSelector,
    ({ updateQuestion }) => updateQuestion
)
export const deleteQuestionDataSelector = createSelector(
    rootSelector,
    ({ deleteQuestion }) => deleteQuestion
)
export const importQuestionDataSelector = createSelector(
    rootSelector,
    ({ importQuestion }) => importQuestion
)
