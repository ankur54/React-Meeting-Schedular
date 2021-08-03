import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    id: null,
	title: "",
	message: "",
    type: "",
    show: false,
};

const notificationSlice = createSlice({
	name: "Notification",
    initialState: initialState,
    reducers: {
        setNotification(state, action) {
            state.id = uuidv4()
            state.title = action.payload.title
            state.message = action.payload.message
            state.type = action.payload.type
            state.show = true;
        },

        removeNotification(state) {
            state.id = null
            state.title = ''
            state.message = ''
            state.type = ''
            state.show = false
        }
    }
});


export default notificationSlice.reducer
export const notificationActions = notificationSlice.actions