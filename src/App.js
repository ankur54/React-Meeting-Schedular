import { Fragment, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./App.css";
import Header from "./components/Header/Header";
import Meetings from "./components/Meetings/Meetings";
import Teams from "./components/Teams/Teams";

import AuthFormConfig from "./utils/Auth Form/AuthForm";
import { authActions } from "./store/AuthStore";
import { meetingActions } from "./store/MeetingStore";
import socket from "./utils/Socket Config/SocketConfig";

function App() {
	const [addMeetingClicked, setAddMeetingClicked] = useState(false);
	const [addTeamClicked, setAddTeamClicked] = useState(false);
	const [tab, setTab] = useState("meeting");

	const token = useSelector((state) => state.authentication.token);
	const userId = useSelector((state) => state.authentication.userId);
	const logoutTime = useSelector((state) => state.authentication.expiresIn);
	const dispatch = useDispatch();
	const isAuthenticated = !!token;

	// configuring socket io client
	useEffect(() => {
		socket.on("meetings", (data) => {
			if (data.action === "CREATE") {
				const newMeeting = data.meeting;
				dispatch(meetingActions.addMeeting([newMeeting]));
			} else if (data.action === "ADD USER") {
				const newMeeting = data.meeting;
				const modifiedUser = data.user;

				if (userId === modifiedUser._id) {
					dispatch(meetingActions.addMeeting([newMeeting]));
				} else {
					dispatch(
						meetingActions.updateMeeting({ meeting: newMeeting })
					);
					dispatch(meetingActions.setMeeting(newMeeting._id));
				}
			} else if (
				data.action === "REMOVE USER" ||
				data.action === "REJECTED"
			) {
				const newMeeting = data.meeting;
				const userid = data.userId;

				dispatch(
					meetingActions.updateMeeting({ meeting: newMeeting })
				);
				if (userId !== userid) {
					dispatch(meetingActions.setMeeting(newMeeting._id));
				}
			} else if (data.action === "ACCEPTED") {
				const newMeeting = data.meeting;
				const userid = data.userId;
				dispatch(meetingActions.updateMeeting({ meeting: newMeeting }));
				dispatch(meetingActions.setMeeting(newMeeting._id));
			}
		});
	}, []);

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
			<Switch>
				<Route path="/auth">
					<AuthFormConfig />
				</Route>
				{isAuthenticated && <Route path="/">{mainPage}</Route>}
				{!isAuthenticated && (
					<Route path="*">
						<AuthFormConfig />
					</Route>
				)}
				{isAuthenticated && <Route path="*">{mainPage}</Route>}
			</Switch>
		</Fragment>
	);
}

export default App;
