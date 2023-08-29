import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

export const ROOT_STATE_NAME = 'topic'
const initialState = {
    topics: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
    topicDetail: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
    createTopicDetail: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
    updateTopicDetail: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
    deleteTopicDetail: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
}

const topicSlice = createSlice({
    name: ROOT_STATE_NAME,
    initialState,
    reducers: {
        getTopicsRequest(state) {
            state.topics.status = 'loading'
            state.topics.data = []
        },
        getTopicsSuccess(state, action) {
            state.topics.data = action.payload
            state.topics.status = 'success'
        },
        getTopicsFailure(state, action) {
            state.topics.status = 'failed'
            state.topics.data = []
            state.topics.error = action.payload
        },

        getTopicDetailRequest(state) {
            state.topicDetail.status = 'loading'
            state.topicDetail.data = []
        },
        getTopicDetailSuccess(state, action) {
            state.topicDetail.data = action.payload
            state.topicDetail.status = 'success'
        },
        getTopicDetailFailure(state, action) {
            state.topicDetail.status = 'failed'
            state.topicDetail.data = []
            state.topicDetail.error = action.payload
        },

        createTopicsRequest(state) {
            state.createTopicDetail.status = 'loading'
            state.createTopicDetail.data = []
        },
        createTopicsSuccess(state, action) {
            state.createTopicDetail.data = action.payload
            state.createTopicDetail.status = 'success'
        },
        createTopicsFailure(state, action) {
            state.createTopicDetail.status = 'failed'
            state.createTopicDetail.data = []
            state.createTopicDetail.error = action.payload
        },

        updateTopicsRequest(state) {
            state.updateTopicDetail.status = 'loading'
            state.updateTopicDetail.data = []
        },
        updateTopicsSuccess(state, action) {
            state.updateTopicDetail.data = action.payload
            state.updateTopicDetail.status = 'success'
        },
        updateTopicsFailure(state, action) {
            state.updateTopicDetail.status = 'failed'
            state.updateTopicDetail.data = []
            state.updateTopicDetail.error = action.payload
        },

        deleteTopicsRequest(state) {
            state.deleteTopicDetail.status = 'loading'
            state.deleteTopicDetail.data = []
        },
        deleteTopicsSuccess(state, action) {
            state.deleteTopicDetail.data = action.payload
            state.deleteTopicDetail.status = 'success'
        },
        deleteTopicsFailure(state, action) {
            state.deleteTopicDetail.status = 'failed'
            state.deleteTopicDetail.data = []
            state.deleteTopicDetail.error = action.payload
        },

        resetTopicState(state) {
            return initialState
        },
    },
})

// Extract the action creators object and the reducer
const { actions, reducer } = topicSlice
// Export the reducer, either as a default or named export
export default reducer
// Extract and export each action creator by name
export const {
    getTopicsRequest,
    getTopicsSuccess,
    getTopicsFailure,
    getTopicDetailRequest,
    getTopicDetailSuccess,
    getTopicDetailFailure,
    createTopicsRequest,
    createTopicsSuccess,
    createTopicsFailure,
    updateTopicsRequest,
    updateTopicsSuccess,
    updateTopicsFailure,
    deleteTopicsRequest,
    deleteTopicsSuccess,
    deleteTopicsFailure,
    resetTopicState,
} = actions

// Create and export each selector create by name
export const rootSelector = (state) => state[ROOT_STATE_NAME] || {}

export const topicsSelector = createSelector(
    rootSelector,
    ({ topics }) => topics
)

export const topicDetailSelector = createSelector(
    rootSelector,
    ({ topicDetail }) => topicDetail
)

export const createTopicDetailSelector = createSelector(
    rootSelector,
    ({ createTopicDetail }) => createTopicDetail
)

export const updateTopicDetailSelector = createSelector(
    rootSelector,
    ({ updateTopicDetail }) => updateTopicDetail
)

export const deleteTopicDetailSelector = createSelector(
    rootSelector,
    ({ deleteTopicDetail }) => deleteTopicDetail
)
