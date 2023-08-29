import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

export const ROOT_STATE_NAME = 'exam'
const initialState = {
    exams: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },

    examDetail: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },

    submitExamData: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },

    createExam: {
        data: {},
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
    updateExam: {
        data: {},
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
    examData: {
        data: {},
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
}

const examSlice = createSlice({
    name: ROOT_STATE_NAME,
    initialState,
    reducers: {
        getExamsRequest(state) {
            state.exams.status = 'loading'
            state.exams.data = []
        },
        getExamsSuccess(state, action) {
            state.exams.data = action.payload
            state.exams.status = 'success'
        },
        getExamsFailure(state, action) {
            state.exams.status = 'failed'
            state.exams.data = []
            state.exams.error = action.payload
        },

        getExamDetailRequest(state) {
            state.examDetail.status = 'loading'
            state.examDetail.data = []
        },
        getExamDetailSuccess(state, action) {
            state.examDetail.data = action.payload
            state.examDetail.status = 'success'
        },
        getExamDetailFailure(state, action) {
            state.examDetail.status = 'failed'
            state.examDetail.data = []
            state.examDetail.error = action.payload
        },

        submitExamDataRequest(state) {
            state.submitExamData.status = 'loading'
            state.submitExamData.data = []
        },
        submitExamDataSuccess(state, action) {
            state.submitExamData.data = action.payload
            state.submitExamData.status = 'success'
        },
        submitExamDataFailure(state, action) {
            state.submitExamData.status = 'failed'
            state.submitExamData.data = []
            state.submitExamData.error = action.payload
        },

        clearExamDataRequest(state) {
            state.createExam.status = ''
            state.createExam.data = {}
        },
        createExamDataRequest(state) {
            state.createExam.status = 'loading'
            state.createExam.data = {}
        },
        createExamDataSuccess(state, action) {
            state.createExam.data = action.payload
            state.createExam.status = 'success'
        },
        createExamDataFailure(state, action) {
            state.createExam.status = 'failed'
            state.createExam.data = {}
            state.createExam.error = action.payload
        },
        updateExamDataRequest(state) {
            state.updateExam.status = 'loading'
            state.updateExam.data = {}
        },
        updateExamDataSuccess(state, action) {
            state.updateExam.data = action.payload
            state.updateExam.status = 'success'
        },
        updateExamDataFailure(state, action) {
            state.updateExam.status = 'failed'
            state.updateExam.data = {}
            state.updateExam.error = action.payload
        },
        deleteExamDataRequest(state) {
            state.examData.status = 'loading'
            state.examData.data = {}
        },
        deleteExamDataSuccess(state, action) {
            state.examData.data = action.payload
            state.examData.status = 'success'
        },
        deleteExamDataFailure(state, action) {
            state.examData.status = 'failed'
            state.examData.data = {}
            state.examData.error = action.payload
        },
        resetSateRequest(state) {
            state.createExam.status = 'loading'
            state.createExam.data = {}
        },
        resetExamDataSuccess(state, action) {
            state.createExam.data = {}
            state.createExam.status = 'success'
        },
        resetExamDataFailure(state, action) {
            state.createExam.status = 'failed'
            state.createExam.data = {}
            state.createExam.error = action.payload
        },

        resetExamState(state) {
            return initialState
        },
    },
})

// Extract the action creators object and the reducer
const { actions, reducer } = examSlice
// Export the reducer, either as a default or named export
export default reducer
// Extract and export each action creator by name
export const {
    getExamsRequest,
    getExamsSuccess,
    getExamsFailure,
    getExamDetailRequest,
    getExamDetailSuccess,
    getExamDetailFailure,
    submitExamDataRequest,
    submitExamDataSuccess,
    submitExamDataFailure,
    clearExamDataRequest,
    createExamDataRequest,
    createExamDataSuccess,
    createExamDataFailure,
    updateExamDataRequest,
    updateExamDataSuccess,
    updateExamDataFailure,
    deleteExamDataRequest,
    deleteExamDataSuccess,
    deleteExamDataFailure,
    resetSateRequest,
    resetExamDataSuccess,
    resetExamDataFailure,
    resetExamState,
} = actions

// Create and export each selector create by name
export const rootSelector = (state) => state[ROOT_STATE_NAME] || {}

export const examsSelector = createSelector(rootSelector, ({ exams }) => exams)
export const examDetailSelector = createSelector(
    rootSelector,
    ({ examDetail }) => examDetail
)
export const submitExamDataSelector = createSelector(
    rootSelector,
    ({ submitExamData }) => submitExamData
)
export const createExamDataSelector = createSelector(
    rootSelector,
    ({ createExam }) => createExam
)
export const updateExamDataSelector = createSelector(
    rootSelector,
    ({ updateExam }) => updateExam
)
export const deleteExamDataSelector = createSelector(
    rootSelector,
    ({ examData }) => examData
)

export const resetExamDataSelector = createSelector(
    rootSelector,
    ({ reset }) => reset
)
