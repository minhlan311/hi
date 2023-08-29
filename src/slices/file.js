import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

export const ROOT_STATE_NAME = 'file'
const initialState = {
    fileContent: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
}

const fileSlide = createSlice({
    name: ROOT_STATE_NAME,
    initialState,
    reducers: {
        getAttachmentContentRequest(state) {
            state.fileContent.status = 'loading'
            state.fileContent.data = []
        },
        getAttachmentContentSuccess(state, action) {
            state.fileContent.data = action.payload
            state.fileContent.status = 'success'
        },
        getAttachmentContentFailure(state, action) {
            state.fileContent.status = 'failed'
            state.fileContent.data = []
            state.fileContent.error = action.payload
        },
        uploadAttachmentRequest(state) {
            state.fileContent.status = 'loading'
            state.fileContent.data = []
        },
        uploadAttachmentSuccess(state, action) {
            state.fileContent.data = action.payload
            state.fileContent.status = 'success'
        },
        uploadAttachmentFailure(state, action) {
            state.fileContent.status = 'failed'
            state.fileContent.data = []
            state.fileContent.error = action.payload
        },
        uploadImageRequest(state) {
            state.fileContent.status = 'loading'
            state.fileContent.data = []
        },
        uploadImageSuccess(state, action) {
            state.fileContent.data = action.payload
            state.fileContent.status = 'success'
        },
        uploadImageFailure(state, action) {
            state.fileContent.status = 'failed'
            state.fileContent.data = []
            state.fileContent.error = action.payload
        },
    },
})

// Extract the action creators object and the reducer
const { actions, reducer } = fileSlide
// Export the reducer, either as a default or named export
export default reducer
// Extract and export each action creator by name
export const {
    getAttachmentContentRequest,
    getAttachmentContentSuccess,
    getAttachmentContentFailure,
    uploadAttachmentRequest,
    uploadAttachmentSuccess,
    uploadAttachmentFailure,
    uploadImageRequest,
    uploadImageSuccess,
    uploadImageFailure,
} = actions

// Create and export each selector create by name
export const rootSelector = (state) => state[ROOT_STATE_NAME] || {}

export const fileSelector = createSelector(
    rootSelector,
    ({ fileContent }) => fileContent
)
