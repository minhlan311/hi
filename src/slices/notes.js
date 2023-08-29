import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

export const ROOT_STATE_NAME = 'note'
const initialState = {
    notes: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
    noteDetail: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
    createNoteDetail: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
    updateNoteDetail: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
    deleteNoteDetail: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
}

const noteSlice = createSlice({
    name: ROOT_STATE_NAME,
    initialState,
    reducers: {
        getNotesRequest(state) {
            state.notes.status = 'loading'
            state.notes.data = []
        },
        getNotesSuccess(state, action) {
            state.notes.data = action.payload
            state.notes.status = 'success'
        },
        getNotesFailure(state, action) {
            state.notes.status = 'failed'
            state.notes.data = []
            state.notes.error = action.payload
        },

        getNoteDetailRequest(state) {
            state.noteDetail.status = 'loading'
            state.noteDetail.data = []
        },
        getNoteDetailSuccess(state, action) {
            state.noteDetail.data = action.payload
            state.noteDetail.status = 'success'
        },
        getNoteDetailFailure(state, action) {
            state.noteDetail.status = 'failed'
            state.noteDetail.data = []
            state.noteDetail.error = action.payload
        },

        createNotesRequest(state) {
            state.createNoteDetail.status = 'loading'
            state.createNoteDetail.data = []
        },
        createNotesSuccess(state, action) {
            state.createNoteDetail.data = action.payload
            state.createNoteDetail.status = 'success'
        },
        createNotesFailure(state, action) {
            state.createNoteDetail.status = 'failed'
            state.createNoteDetail.data = []
            state.createNoteDetail.error = action.payload
        },

        updateNotesRequest(state) {
            state.updateNoteDetail.status = 'loading'
            state.updateNoteDetail.data = []
        },
        updateNotesSuccess(state, action) {
            state.updateNoteDetail.data = action.payload
            state.updateNoteDetail.status = 'success'
        },
        updateNotesFailure(state, action) {
            state.updateNoteDetail.status = 'failed'
            state.updateNoteDetail.data = []
            state.updateNoteDetail.error = action.payload
        },

        deleteNotesRequest(state) {
            state.deleteNoteDetail.status = 'loading'
            state.deleteNoteDetail.data = []
        },
        deleteNotesSuccess(state, action) {
            state.deleteNoteDetail.data = action.payload
            state.deleteNoteDetail.status = 'success'
        },
        deleteNotesFailure(state, action) {
            state.deleteNoteDetail.status = 'failed'
            state.deleteNoteDetail.data = []
            state.deleteNoteDetail.error = action.payload
        },
        resetNotesState(state) {
            return initialState
        },
    },
})

// Extract the action creators object and the reducer
const { actions, reducer } = noteSlice
// Export the reducer, either as a default or named export
export default reducer
// Extract and export each action creator by name
export const {
    getNotesRequest,
    getNotesSuccess,
    getNotesFailure,
    getNoteDetailRequest,
    getNoteDetailSuccess,
    getNoteDetailFailure,
    createNotesRequest,
    createNotesSuccess,
    createNotesFailure,
    updateNotesRequest,
    updateNotesSuccess,
    updateNotesFailure,
    deleteNotesRequest,
    deleteNotesSuccess,
    deleteNotesFailure,
    resetNotesState,
} = actions

// Create and export each selector create by name
export const rootSelector = (state) => state[ROOT_STATE_NAME] || {}

export const notesSelector = createSelector(rootSelector, ({ notes }) => notes)

export const noteDetailSelector = createSelector(
    rootSelector,
    ({ noteDetail }) => noteDetail
)

export const createNoteDetailSelector = createSelector(
    rootSelector,
    ({ createNoteDetail }) => createNoteDetail
)

export const updateNoteDetailSelector = createSelector(
    rootSelector,
    ({ updateNoteDetail }) => updateNoteDetail
)

export const deleteNoteDetailSelector = createSelector(
    rootSelector,
    ({ deleteNoteDetail }) => deleteNoteDetail
)
