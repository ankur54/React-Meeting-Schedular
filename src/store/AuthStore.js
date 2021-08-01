import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: localStorage.getItem('token') || null,
    expiresIn: +localStorage.getItem('expires in') || 0,
    userId: localStorage.getItem('user id') || null,
    userName: localStorage.getItem('user name') || null,
    userEmail: localStorage.getItem('user email') || null
}

const authSlice = createSlice({
    name: 'Authentication',
    initialState: initialState,
    reducers: {
        login(state, action) {
                const { token, userId, userName, userEmail } = action.payload
                const date = new Date()
                const expiresIn = (
                    date.getHours() * 60 * 60 * 1000 + 
                    date.getMinutes() * 60 * 1000 +
                    date.getSeconds() * 1000 + 
                    date.getMilliseconds() +
                    60 * 60 * 1000
                )

                localStorage.setItem('token', token)
                localStorage.setItem('user id', userId)
                localStorage.setItem('user name', userName)
                localStorage.setItem('user email', userEmail)
                localStorage.setItem('expires in', expiresIn)

                state.token = token
                state.userId = userId
                state.userEmail = userEmail
                state.userName = userName
                state.expiresIn = expiresIn
        },
        logout(state) {
            localStorage.removeItem('token')
            localStorage.removeItem('user id')
            localStorage.removeItem('user name')
            localStorage.removeItem('user email')
            localStorage.removeItem('expires in')

            state.token = null
            state.userId = null
            state.userEmail = null
            state.userName = null
            state.expiresIn = null
        }
    }
})

export default authSlice.reducer
export const authActions = authSlice.actions