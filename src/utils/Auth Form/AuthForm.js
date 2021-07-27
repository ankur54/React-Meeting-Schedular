import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

import AuthForm from '../../UI/Auth Form Container/AuthForm'

const AuthFormConfig = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onLoginHandler = async e => {
        try {
            e.preventDefault()

            // try to login user
            let response = await fetch('http://localhost:8000/auth/login', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            // throw error if something goes wrong in the backend
            if (response.error) {
                throw new Error(response.error)
            }
            
            // if everything goes well store token and userId in redux
            response = await response.json()
            const { token, userId, userName, userEmail } = response
            dispatch({
                type: 'login',
                payload: {
                    token,
                    userId,
                    userName,
                    userEmail
                }
            })
            setTimeout(() => { 
                dispatch({ type: 'logout' })
            }, 60 * 60 * 1000);
            history.replace('/')
        }
        catch (err) {
            console.log(err.message)
        }
    }
    const onSignupHandler = async e => {
        try {
            e.preventDefault()

            // try to login user
            const response = await fetch('http://localhost:8000/auth/signup', {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            // throw error if something goes wrong in the backend
            if (response.status === 400) {
                throw new Error(response.error)
            }
            
            // if everything goes well redirect to login page
            history.replace('/auth')
        }
        catch (err) {
            console.log(err.message)
        }
    }
    const onNameChange = e => {
        setName(e.target.value)
    }
    const onEmailChange = e => {
        setEmail(e.target.value)
    }
    const onPasswordChange = e => {
        setPassword(e.target.value)
    }



    const config = [
        { 
            title: 'Login',
            heading: 'Lets get the day organised and dusted!',
            right: {
                image: `${process.env.PUBLIC_URL}/images/login.png`,
                heading: 'Schedule your day & get a step closer to your pajamas!'
            },
            left: {
                inputList: [
                    {
                        type: 'email',
                        name: 'userEmail',
                        placeholder: 'Enter your email',
                        onChangeHandler: onEmailChange,
                        value: email,
                        required: true
                    },
                    {
                        type: 'password',
                        name: 'userPassword',
                        placeholder: 'Enter your password',
                        onChangeHandler: onPasswordChange,
                        value: password,
                        required: true
                    }
                ]
            },
            hyue: '#F1CCD9',
            next: 'Don\'t have an accout yet?',
            submitHandler: onLoginHandler
        },
        { 
            title: 'Signup',
            heading: 'Send your productivity of the roof! Signup and get started',
            right: {
                image: `${process.env.PUBLIC_URL}/images/signup.png`,
                heading: 'Schedule your day and get a step closer to your pajamas!'
            },
            left: {
                inputList: [
                    {
                        type: 'text',
                        name: 'userName',
                        placeholder: 'Enter your name',
                        onChangeHandler: onNameChange,
                        value: name,
                        required: true
                    },
                    {
                        type: 'email',
                        name: 'userEmail',
                        placeholder: 'Enter your email',
                        onChangeHandler: onEmailChange,
                        value: email,
                        required: true
                    },
                    {
                        type: 'password',
                        name: 'userPassword',
                        placeholder: 'Enter a secure password',
                        onChangeHandler: onPasswordChange,
                        value: password,
                        required: true
                    }
                ]
            },
            hyue: '#F4D38A',
            next: 'Already have an account?',
            submitHandler: onSignupHandler
        },
    ]

    return <AuthForm sections={config} />
}

export default AuthFormConfig