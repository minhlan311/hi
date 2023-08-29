import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

export const ROOT_STATE_NAME = 'mentorIntroduce'
const initialState = {
    mentorIntroduces: {
        data: [],
        status: '', // or: 'loading', 'success', 'failed'
        error: null,
    },
}
const mentorIntroduceSlice = createSlice({
    name: ROOT_STATE_NAME,
    initialState,
    reducers: {
        getMentorIntroducesRequest(state) {
            state.mentorIntroduces.status = 'loading'
            state.mentorIntroduces.data = []
        },
        getMentorIntroducesSuccess(state, action) {
            state.mentorIntroduces.data = action.payload
            state.mentorIntroduces.status = 'success'
        },
        getMentorIntroducesFailure(state, action) {
            state.mentorIntroduces.status = 'failed'
            state.mentorIntroduces.data = []
            state.mentorIntroduces.error = action.payload
        },
    },
})
const { actions, reducer } = mentorIntroduceSlice
export default reducer
export const {
    getMentorIntroducesRequest,
    getMentorIntroducesSuccess,
    getMentorIntroducesFailure,
} = actions

export const rootSelector = (state) => state[ROOT_STATE_NAME] || {}
export const mentorIntroducesSelector = createSelector(
    rootSelector,
    ({ mentorIntroduces }) => mentorIntroduces
)
