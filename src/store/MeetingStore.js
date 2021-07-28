import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    meetings: [],
    selectedMeeting: null
}

const meetingSlice = createSlice({
    name: 'Meeting',
    initialState: initialState,
    reducers: {
        getMeetings(state, action) {
            state.meetings = action.payload
        },
        addMeeting(state, action) {
            state.meetings = [
                ...state.meetings,
                ...action.payload
            ]
        },
        setMeeting(state, action) {
            state.selectedMeeting = state.meetings
                                    .find(meeting => 
                                        meeting._id === action.payload)
        }
    }
})

export default meetingSlice.reducer
export const meetingActions = meetingSlice.actions