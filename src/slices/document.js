import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

export const ROOT_STATE_NAME = 'documents'
const initialState = {
    documents: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
    documentDetail: {
        data: {},
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
    deleteDocument: {
        data: {},
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
    updateDocument: {
        data: {},
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
    downloadDocument: {
        data: {},
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
}

const documentsSlice = createSlice({
    name: ROOT_STATE_NAME,
    initialState,
    reducers: {
        getDocumentsRequest(state) {
            state.documents.status = 'loading'
            state.documents.data = []
        },
        getDocumentsSuccess(state, action) {
            state.documents.data = action.payload
            state.documents.status = 'success'
        },
        getDocumentsFailure(state, action) {
            state.documents.status = 'failed'
            state.documents.data = []
            state.documents.error = action.payload
        },

        createDocumentRequest(state) {
            state.documentDetail.status = 'loading'
            state.documentDetail.data = {}
        },
        createDocumentSuccess(state, action) {
            state.documentDetail.data = action.payload
            state.documentDetail.status = 'success'
        },
        createDocumentFailure(state, action) {
            state.documentDetail.status = 'failed'
            state.documentDetail.data = {}
            state.documentDetail.error = action.payload
        },

        getDocumentDetailRequest(state) {
            state.documentDetail.status = 'loading'
            state.documentDetail.data = {}
        },
        getDocumentDetailSuccess(state, action) {
            state.documentDetail.data = action.payload
            state.documentDetail.status = 'success'
        },
        getDocumentDetailFailure(state, action) {
            state.documentDetail.status = 'failed'
            state.documentDetail.data = {}
            state.documentDetail.error = action.payload
        },

        downloadDocumentRequest(state) {
            state.downloadDocument.status = 'loading'
            state.downloadDocument.data = {}
        },
        downloadDocumentSuccess(state, action) {
            state.downloadDocument.data = action.payload
            state.downloadDocument.status = 'success'
        },
        downloadDocumentFailure(state, action) {
            state.downloadDocument.status = 'failed'
            state.downloadDocument.data = {}
            state.downloadDocument.error = action.payload
        },

        deleteDocumentRequest(state) {
            state.deleteDocument.status = 'loading'
            state.deleteDocument.data = {}
        },
        deleteDocumentSuccess(state, action) {
            state.deleteDocument.data = action.payload
            state.deleteDocument.status = 'success'
        },
        deleteDocumentFailure(state, action) {
            state.deleteDocument.status = 'failed'
            state.deleteDocument.data = {}
            state.deleteDocument.error = action.payload
        },

        updateDocumentRequest(state) {
            state.updateDocument.status = 'loading'
            state.updateDocument.data = {}
        },
        updateDocumentSuccess(state, action) {
            state.updateDocument.data = action.payload
            state.updateDocument.status = 'success'
        },

        updateDocumentFailure(state, action) {
            state.updateDocument.status = 'failed'
            state.updateDocument.data = {}
            state.updateDocument.error = action.payload
        },
        resetDocumentState(state) {
            return initialState
        },
    },
})

// Extract the action creators object and the reducer
const { actions, reducer } = documentsSlice
// Export the reducer, either as a default or named export
export default reducer
// Extract and export each action creator by name
export const {
    getDocumentsRequest,
    getDocumentsSuccess,
    getDocumentsFailure,
    getDocumentDetailFailure,
    getDocumentDetailRequest,
    getDocumentDetailSuccess,
    createDocumentRequest,
    createDocumentSuccess,
    createDocumentFailure,
    downloadDocumentRequest,
    downloadDocumentSuccess,
    downloadDocumentFailure,
    deleteDocumentRequest,
    deleteDocumentSuccess,
    deleteDocumentFailure,

    updateDocumentRequest,
    updateDocumentSuccess,
    updateDocumentFailure,
    resetDocumentState,
} = actions

// Create and export each selector create by name
export const rootSelector = (state) => state[ROOT_STATE_NAME] || {}

export const documentsSelector = createSelector(
    rootSelector,
    ({ documents }) => documents
)

export const documentDetailSelector = createSelector(
    rootSelector,
    ({ documentDetail }) => documentDetail
)

export const deleteDocumentSelector = createSelector(
    rootSelector,
    ({ deleteDocument }) => deleteDocument
)

export const downloadDocumentSelector = createSelector(
    rootSelector,
    ({ downloadDocument }) => downloadDocument
)

export const updateDocumentSelector = createSelector(
    rootSelector,
    ({ updateDocument }) => updateDocument
)
