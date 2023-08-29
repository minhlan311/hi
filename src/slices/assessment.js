import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

export const ROOT_STATE_NAME = 'assessment'
const initialState = {
    createAssessment: {
        data: {},
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
    assessment: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
    assessmentUser: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
}

const assessmentSlice = createSlice({
    name: ROOT_STATE_NAME,
    initialState,
    reducers: {
        createAssessmentRequest(state) {
            state.createAssessment.status = 'loading'
            state.createAssessment.data = {}
        },
        createAssessmentSuccess(state, action) {
            state.createAssessment.data = action.payload
            state.createAssessment.status = 'success'
        },
        createAssessmentFailure(state, action) {
            state.createAssessment.status = 'failed'
            state.createAssessment.data = {}
            state.createAssessment.error = action.payload
        },

        getAssessmentRequest(state) {
            state.assessment.status = 'loading'
            state.assessment.data = {}
        },
        getAssessmentSuccess(state, action) {
            state.assessment.data = action.payload
            state.assessment.status = 'success'
        },
        getAssessmentFailure(state, action) {
            state.assessment.status = 'failed'
            state.assessment.data = {}
            state.assessment.error = action.payload
        },
        getAssessmentUserRequest(state) {
            state.assessmentUser.status = 'loading'
            state.assessmentUser.data = {}
        },
        getAssessmentUserSuccess(state, action) {
            state.assessmentUser.data = action.payload
            state.assessmentUser.status = 'success'
        },
        getAssessmentUserFailure(state, action) {
            state.assessmentUser.status = 'failed'
            state.assessmentUser.data = {}
            state.assessmentUser.error = action.payload
        },
        resetAssessmentState(state) {
            return initialState
        },
    },
})

// Extract the action creators object and the reducer
const { actions, reducer } = assessmentSlice
// Export the reducer, either as a default or named export
export default reducer
// Extract and export each action creator by name
export const {
    createAssessmentRequest,
    createAssessmentSuccess,
    createAssessmentFailure,
    getAssessmentRequest,
    getAssessmentSuccess,
    getAssessmentFailure,
    getAssessmentUserRequest,
    getAssessmentUserSuccess,
    getAssessmentUserFailure,
    resetAssessmentState,
} = actions

// Create and export each selector create by name
export const rootSelector = (state) => state[ROOT_STATE_NAME] || {}

export const createAssessmentSelector = createSelector(
    rootSelector,
    ({ createAssessment }) => createAssessment
)

export const assessmentSelector = createSelector(
    rootSelector,
    ({ assessment }) => assessment
)
export const assessmentUserSelector = createSelector(
    rootSelector,
    ({ assessmentUser }) => assessmentUser
)
