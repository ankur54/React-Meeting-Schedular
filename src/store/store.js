import { createStore } from 'redux'

const initialState = {
    token: localStorage.getItem('token') || null,
    userId: null
}

const reducer = (state = initialState, action) => {
    const { type, payload } = action
    console.log(action)

    switch (type) {
        case "login":
            localStorage.setItem('token', payload.token)
            return { token: payload.token }
            break;
        
        case "logout":
            return { userId: payload.userId }
            break;
    
        default:
            break;
    }

    return state
}

const store = createStore(reducer)

export default store;