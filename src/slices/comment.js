import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

export const ROOT_STATE_NAME = 'comment'
const initialState = {
    comments: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },

    commentDetail: {
        data: {},
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },

    createComment: {
        data: {},
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },

    updateComment: {
        data: {},
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },

    deleteComment: {
        data: {},
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },

    replyComment: {
        data: {},
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
}

const commentSlice = createSlice({
    name: ROOT_STATE_NAME,
    initialState,
    reducers: {
        getCommentsRequest(state) {
            state.comments.status = 'loading'
            state.comments.data = []
        },
        getCommentsSuccess(state, action) {
            state.comments.data = action.payload
            state.comments.status = 'success'
        },
        getCommentsFailure(state, action) {
            state.comments.status = 'failed'
            state.comments.data = []
            state.comments.error = action.payload
        },

        getCommentDetailRequest(state) {
            state.commentDetail.status = 'loading'
            state.commentDetail.data = {}
        },
        getCommentDetailSuccess(state, action) {
            state.commentDetail.data = action.payload
            state.commentDetail.status = 'success'
        },
        getCommentDetailFailure(state, action) {
            state.commentDetail.status = 'failed'
            state.commentDetail.data = {}
            state.commentDetail.error = action.payload
        },

        replyCommentsRequest(state) {
            state.replyComment.status = 'loading'
            state.replyComment.data = {}
        },
        replyCommentsSuccess(state, action) {
            state.replyComment.data = action.payload
            state.replyComment.status = 'success'
        },
        replyCommentsFailure(state, action) {
            state.replyComment.status = 'failed'
            state.replyComment.data = {}
            state.replyComment.error = action.payload
        },
        createCommentsRequest(state) {
            state.createComment.status = 'loading'
            state.createComment.data = {}
        },
        createCommentsSuccess(state, action) {
            state.createComment.data = action.payload
            state.createComment.status = 'success'
        },
        createCommentsFailure(state, action) {
            state.createComment.status = 'failed'
            state.createComment.data = {}
            state.createComment.error = action.payload
        },
        updateCommentsRequest(state) {
            state.updateComment.status = 'loading'
            state.updateComment.data = {}
        },
        updateCommentsSuccess(state, action) {
            state.updateComment.data = action.payload
            state.updateComment.status = 'success'
        },
        updateCommentsFailure(state, action) {
            state.updateComment.status = 'failed'
            state.updateComment.data = {}
            state.updateComment.error = action.payload
        },
        deleteCommentsRequest(state) {
            state.deleteComment.status = 'loading'
            state.deleteComment.data = {}
        },
        deleteCommentsSuccess(state, action) {
            state.deleteComment.data = action.payload
            state.deleteComment.status = 'success'
        },
        deleteCommentsFailure(state, action) {
            state.deleteComment.status = 'failed'
            state.deleteComment.data = {}
            state.deleteComment.error = action.payload
        },
        resetCommentState(state) {
            return initialState
        },
    },
})

// Extract the action creators object and the reducer
const { actions, reducer } = commentSlice
// Export the reducer, either as a default or named export
export default reducer
// Extract and export each action creator by name
export const {
    getCommentsRequest,
    getCommentsSuccess,
    getCommentsFailure,
    getCommentDetailRequest,
    getCommentDetailSuccess,
    getCommentDetailFailure,
    replyCommentsRequest,
    replyCommentsSuccess,
    replyCommentsFailure,
    createCommentsRequest,
    createCommentsSuccess,
    createCommentsFailure,
    updateCommentsRequest,
    updateCommentsSuccess,
    updateCommentsFailure,
    deleteCommentsRequest,
    deleteCommentsSuccess,
    deleteCommentsFailure,
    resetCommentState,
} = actions

// Create and export each selector create by name
export const rootSelector = (state) => state[ROOT_STATE_NAME] || {}

export const commentsSelector = createSelector(
    rootSelector,
    ({ comments }) => comments
)
export const commentDetailSelector = createSelector(
    rootSelector,
    ({ commentDetail }) => commentDetail
)
export const createCommentSelector = createSelector(
    rootSelector,
    ({ createComment }) => createComment
)

export const updateCommentSelector = createSelector(
    rootSelector,
    ({ updateComment }) => updateComment
)

export const deleteCommentSelector = createSelector(
    rootSelector,
    ({ deleteComment }) => deleteComment
)

export const replyCommentSelector = createSelector(
    rootSelector,
    ({ replyComment }) => replyComment
)
