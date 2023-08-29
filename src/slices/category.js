import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

export const ROOT_STATE_NAME = 'category'
const initialState = {
    categories: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
    categoryDetail: {
        data: {},
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
}

const categorySlice = createSlice({
    name: ROOT_STATE_NAME,
    initialState,
    reducers: {
        getCategoriesRequest(state) {
            state.categories.status = 'loading'
            state.categories.data = []
        },
        getCategoriesSuccess(state, action) {
            state.categories.data = action.payload
            state.categories.status = 'success'
        },
        getCategoriesFailure(state, action) {
            state.categories.status = 'failed'
            state.categories.data = []
            state.categories.error = action.payload
        },

        getCategoryDetailRequest(state) {
            state.categoryDetail.status = 'loading'
            state.categoryDetail.data = {}
        },
        getCategoryDetailSuccess(state, action) {
            state.categoryDetail.data = action.payload
            state.categoryDetail.status = 'success'
        },
        getCategoryDetailFailure(state, action) {
            state.categoryDetail.status = 'failed'
            state.categoryDetail.data = {}
            state.categoryDetail.error = action.payload
        },
    },
})

// Extract the action creators object and the reducer
const { actions, reducer } = categorySlice
// Export the reducer, either as a default or named export
export default reducer
// Extract and export each action creator by name
export const {
    getCategoriesRequest,
    getCategoriesSuccess,
    getCategoriesFailure,
    getCategoryDetailRequest,
    getCategoryDetailSuccess,
    getCategoryDetailFailure,
} = actions

// Create and export each selector create by name
export const rootSelector = (state) => state[ROOT_STATE_NAME] || {}

export const categoriesSelector = createSelector(
    rootSelector,
    ({ categories }) => categories
)

export const categoryDetailSelector = createSelector(
    rootSelector,
    ({ categoryDetail }) => categoryDetail
)
