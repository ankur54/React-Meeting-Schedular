import { configureStore } from '@reduxjs/toolkit'

import authReducer from './AuthStore'
import meetingReducer from './MeetingStore'

const store = configureStore({
    reducer: {
        authentication: authReducer,
        meeting: meetingReducer
    }
})

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducer, composeEnhancers());


export default store;