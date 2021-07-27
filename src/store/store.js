import { createStore, compose } from 'redux'

const initialState = {
    token: localStorage.getItem('token') || null,
    userId: localStorage.getItem('user id') || null,
    userName: localStorage.getItem('user name') || null,
    userEmail: localStorage.getItem('user email') || null
}

const reducer = (state = initialState, action) => {
    const { type, payload } = action
    console.log(action)

    switch (type) {
        case "login":
            localStorage.setItem('token', payload.token)
            localStorage.setItem('user id', payload.userId)
            localStorage.setItem('user name', payload.userName)
            localStorage.setItem('user email', payload.userEmail)
            return { 
                token: payload.token,
                userId: payload.userId,
                userName: payload.userName,
                userEmail: payload.userEmail
            }
        
        case "logout":
            localStorage.removeItem('token')
            localStorage.removeItem('user id')
            localStorage.removeItem('user name')
            localStorage.removeItem('user email')
            return { 
                token: null,
                userId: null,
                userName: null,
                userEmail: null
            }
    
        default:
            break;
    }

    return state
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers());


export default store;