import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

import AuthForm from '../UI/Auth Form Container/AuthForm'

const AuthFormConfig = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [department, setDepartment] = useState('')

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
            const { token, userId } = response
            dispatch({
                type: 'login',
                payload: {
                    token,
                    userId
                }
            })
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
                    department
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            // throw error if something goes wrong in the backend
            if (response.error) {
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
    const onConfirmPassChange = e => {
        setConfirmPass(e.target.value)
    }
    const onDepartmentChange = e => {
        setDepartment(e.target.value)
    }



    const config = [
        { 
            title: 'Login',
            right: {
                image: `${process.env.PUBLIC_URL}/images/amico.png`
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
            submitHandler: onLoginHandler
        },
        { 
            title: 'Signup',
            right: {
                image: `${process.env.PUBLIC_URL}/images/cuate.png`
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
                    },
                    {
                        type: 'password',
                        name: 'userConfirmPassword',
                        placeholder: 'Re-enter the password for confirmation',
                        onChangeHandler: onConfirmPassChange,
                        value: confirmPass,
                        required: true
                    },
                    {
                        type: 'text',
                        name: 'userDepartment',
                        placeholder: 'Enter your department name',
                        onChangeHandler: onDepartmentChange,
                        value: department,
                        required: false
                    }
                ]
            },
            submitHandler: onSignupHandler
        },
    ]

    return <AuthForm sections={config} />
}

export default AuthFormConfig