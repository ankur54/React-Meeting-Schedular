import { Fragment, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./App.css";
import Header from "./components/Header/Header";
import Meetings from "./components/Meetings/Meetings";
import Teams from "./components/Teams/Teams";
import Toast from "./UI/Toast/Toast";

import useAuthFormConfig from "./hook/use-AuthForm";
import AuthForm from "./UI/Auth Form Container/AuthForm";
import { authActions } from "./store/AuthStore";

function App() {
	const [addMeetingClicked, setAddMeetingClicked] = useState(false);
	const [addTeamClicked, setAddTeamClicked] = useState(false);
	const [tab, setTab] = useState("meeting");

	const token = useSelector((state) => state.authentication.token);
	const logoutTime = useSelector((state) => state.authentication.expiresIn);
	const showNotification = useSelector((state) => state.notification.show);
	const dispatch = useDispatch();
	const isAuthenticated = !!token;

	const config = useAuthFormConfig();

	// logout timer
	useEffect(() => {
		const date = new Date();
		const currTime =
			date.getHours() * 60 * 60 * 1000 +
			date.getMinutes() * 60 * 1000 +
			date.getSeconds() * 1000 +
			date.getMilliseconds();
		console.log(currTime, logoutTime);

		if (!logoutTime) return;

		const remainingTime = logoutTime - currTime;
		console.log(remainingTime);

		setTimeout(() => {
			dispatch(authActions.logout());
		}, remainingTime);
	}, [dispatch]);

	const onAddMeetingClick = () => {
		setAddMeetingClicked((prev) => !prev);
	};
	const onAddTeamClick = () => {
		setAddTeamClicked((prev) => !prev);
	};
	const onChangeTab = (tab) => {
		setTab(tab);
	};

	const onClickHandler =
		tab === "meeting" ? onAddMeetingClick : onAddTeamClick;

	const clickState = tab === "meeting" ? addMeetingClicked : addTeamClicked;

	const mainPage = (
		<Fragment>
			<Header
				addClicked={clickState}
				onClickHandler={onClickHandler}
				onChangeTab={onChangeTab}
				currTab={tab}
			/>
			{tab === "meeting" ? (
				<Meetings displayForm={addMeetingClicked} />
			) : (
				<Teams
					showModal={addTeamClicked}
					onToggleModal={onAddTeamClick}
				/>
			)}
		</Fragment>
	);

	return (
		<Fragment>
			{showNotification && <Toast />}
			<Switch>
				<Route path="/auth">
					<AuthForm sections={config} />
				</Route>
				{isAuthenticated && <Route path="/">{mainPage}</Route>}
				{!isAuthenticated && (
					<Route path="*">
						<AuthForm sections={config} />
					</Route>
				)}
				{isAuthenticated && <Route path="*">{mainPage}</Route>}
			</Switch>
		</Fragment>
	);
}

export default App;
