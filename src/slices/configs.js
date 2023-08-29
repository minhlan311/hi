import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

export const ROOT_STATE_NAME = 'configs'
const initialState = {
    configs: {
        data: {},
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
}

const configsSlice = createSlice({
    name: ROOT_STATE_NAME,
    initialState,
    reducers: {
        getconfigsRequest(state) {
            state.configs.status = 'loading'
            state.configs.data = {}
        },
        getconfigsSuccess(state, action) {
            state.configs.data = action.payload
            state.configs.status = 'success'
        },
        getconfigsFailure(state, action) {
            state.configs.status = 'failed'
            state.configs.data = {}
            state.configs.error = action.payload
        },
    },
})

// Extract the action creators object and the reducer
const { actions, reducer } = configsSlice
// Export the reducer, either as a default or named export
export default reducer
// Extract and export each action creator by name
export const { getconfigsRequest, getconfigsSuccess, getconfigsFailure } =
    actions

// Create and export each selector create by name
export const rootSelector = (state) => state[ROOT_STATE_NAME] || {}

export const configsSelector = createSelector(
    rootSelector,
    ({ configs }) => configs
)
