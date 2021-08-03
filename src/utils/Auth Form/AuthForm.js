import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { v4 as uuidv4 } from "uuid";

import AuthForm from "../../UI/Auth Form Container/AuthForm";
import { authActions } from "../../store/AuthStore";
import { notificationActions } from "../../store/NotificationStore";

const AuthFormConfig = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const onLoginHandler = async (loginInfo) => {
		try {
			// try to login user
			let response = await fetch("http://localhost:8000/auth/login", {
				method: "POST",
				body: JSON.stringify({ ...loginInfo }),
				headers: {
					"Content-Type": "application/json",
				},
			});

			response = await response.json();

			// throw error if something goes wrong in the backend
			if (response.error) throw new Error(response.error);

			// if everything goes well store token and userId in redux
			const { token, userId, userName, userEmail } = response;
			dispatch(
				authActions.login({
					token,
					userId,
					userName,
					userEmail,
				})
			);
			dispatch(
				notificationActions.setNotification({
					title: "Logged In",
					message:
						"You have successfully logged into your calendar space",
					type: "SUCCESS",
				})
			);
			history.replace("/");
		} catch (err) {
			dispatch(
				notificationActions.setNotification({
					title: "Login Error",
					message: err.message,
					type: "DANGER",
				})
			);
			console.log(err.message);
		}
	};
	const onSignupHandler = async (signupInfo) => {
		try {
			// try to login user
			const response = await fetch("http://localhost:8000/auth/signup", {
				method: "POST",
				body: JSON.stringify({ ...signupInfo }),
				headers: {
					"Content-Type": "application/json",
				},
			});

			// throw error if something goes wrong in the backend
			if (response.status === 400) {
				throw new Error(response.error);
			}
			dispatch(
				notificationActions.setNotification({
					title: "Account Created",
					message: "Your account has been created! Login to it",
					type: "SUCCESS",
				})
			);
			// if everything goes well redirect to login page
			history.replace("/auth");
		} catch (err) {
			dispatch(
				notificationActions.setNotification({
					title: "Signup Error",
					message: err.message,
					type: "DANGER",
				})
			);
			console.log(err.message);
		}
	};

	const nameValidator = (name) => {
		if (name === "") throw new Error("Name cannot be empty");
	};

	const emailValidator = (email) => {
		if (email === "") throw new Error("Email not provided");
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!re.test(String(email).toLowerCase()))
			throw new Error("Not a valid email!");
	};

	const passwordStrengthValidator = (password) => {
		passwordValidator(password);
		var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
		if (re.test(password)) throw new Error("Not a strong enough password");
	};

	const passwordValidator = (password) => {
		if (password === "") throw new Error("Password is required");
	};

	const config = [
		{
			title: "Login",
			heading: "Lets get the day organised and dusted!",
			right: {
				image: `${process.env.PUBLIC_URL}/images/login.png`,
				heading:
					"Schedule your day & get a step closer to your pajamas!",
			},
			left: {
				inputList: [
					{
						type: "email",
						name: "email",
						placeholder: "Enter your email",
						validator: emailValidator,
					},
					{
						type: "password",
						name: "password",
						placeholder: "Enter your password",
						validator: passwordValidator,
					},
				],
				buttonList: [
					{
						key: uuidv4(),
						// color: darkHyue,
						family: "secondary",
						type: "submit",
						text: "Login",
						// className: classes["form-submit"],
						onClickHandler: onLoginHandler,
					},
				],
			},
			hyue: "#F1CCD9",
			next: "Don't have an accout yet?",
			// submitHandler: onLoginHandler,
		},
		{
			title: "Signup",
			heading:
				"Send your productivity of the roof! Signup and get started",
			right: {
				image: `${process.env.PUBLIC_URL}/images/signup.png`,
				heading:
					"Schedule your day and get a step closer to your pajamas!",
			},
			left: {
				inputList: [
					{
						type: "text",
						name: "name",
						placeholder: "Enter your name",
						validator: nameValidator,
					},
					{
						type: "email",
						name: "email",
						placeholder: "Enter your email",
						validator: emailValidator,
					},
					{
						type: "password",
						name: "password",
						placeholder: "Enter a secure password",
						validator: passwordStrengthValidator,
					},
				],
				buttonList: [
					{
						key: uuidv4(),
						// color: darkHyue,
						family: "secondary",
						type: "submit",
						text: "Signup",
						// className: classes["form-submit"],
						onClickHandler: onSignupHandler,
					},
				],
			},
			hyue: "#F4D38A",
			next: "Already have an account?",
			// submitHandler: onSignupHandler,
		},
	];

	return <AuthForm sections={config} />;
};

export default AuthFormConfig;
