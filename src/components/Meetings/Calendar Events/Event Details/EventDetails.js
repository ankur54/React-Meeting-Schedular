import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import {
	CheckCircleOutline,
	CancelOutlined,
	Clear,
	Done,
	HelpOutline,
	PersonAdd,
	RemoveCircle,
	ThumbUp,
} from "@material-ui/icons";

import classes from "./EventDetails.module.css";
import Button from "../../../../UI/Button/Button";
import Modal from "../../../../UI/Modal Container/Modal";
import MultiSelect from "../../../../UI/Multi Select/MultiSelect";

const EventDetails = () => {
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	// animation on mount and unmount
	const meetingDetails = useSelector(
		(state) => state.meeting.selectedMeeting
	);
	const token = useSelector((state) => state.authentication.token);
	const userEmail = useSelector((state) => state.authentication.userEmail);
	const selDate = useSelector((state) => state.application.date);
	const selMonth = useSelector((state) => state.application.month);
	const selYear = useSelector((state) => state.application.year);

	const [render, setRender] = useState(!!meetingDetails);
	const [attendeeModal, setAttendeeModal] = useState(false);
	const [attendees, setAttendees] = useState([]);

	const date = new Date(meetingDetails && meetingDetails.date);

	useEffect(() => {
		if (!!meetingDetails) {
			setRender(true);
		} else {
			setRender(false);
		}
	}, [meetingDetails]);

	const onUnmount = () => {
		if (!!!meetingDetails) setRender(false);
	};

	const onToggleModal = (e) => {
		e.preventDefault();
		setAttendeeModal((prev) => !prev);
	};

	const addNewAttendees = (e) => {
		const selectedEmail = meetingDetails.attendees.map(
			(attendee) => attendee.email
		);
		const newAttendees = attendees.filter(
			(attendee) => !selectedEmail.includes(attendee.email)
		);

		try {
			newAttendees.forEach(async (attendee) => {
				let response = await fetch(
					`http://localhost:8000/meeting/add-user/${meetingDetails._id}`,
					{
						method: "PATCH",
						body: JSON.stringify({
							email: attendee.email,
						}),
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				);

				response = await response.json();
				if (response.error) throw new Error(response.error);
			});
		} catch (err) {
			console.log(err.message);
		} finally {
			setAttendees([]);
			onToggleModal(e);
		}
	};

	const selectItemHandler = (user) => {
		setAttendees((prev) => {
			const items = [...prev];
			items.push(user);
			return items;
		});
	};

	const unSelectItemHandler = (user) => {
		setAttendees((prev) => {
			const items = [...prev];
			return items.filter((item) => item._id !== user._id);
		});
	};

	const removeSelfHandler = async (e) => {
		e.preventDefault();
		try {
			let response = await fetch(
				`http://localhost:8000/meeting/del-user/${meetingDetails._id}`,
				{
					method: "PATCH",
					body: JSON.stringify({
						email: userEmail,
					}),
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			response = await response.json();
			if (response.error) throw new Error(response.error);
		} catch (err) {
			console.log(err.message);
		}
	};

	const getItemsHandler = async (searchCriteria) => {
		try {
			const excludeString = meetingDetails.attendees
				.map(
					(attendee, idx) =>
						`
						exclude[${idx}][_id]=${attendee._id}&
						exclude[${idx}][name]=${attendee.name}&
						exclude[${idx}][email]=${attendee.email}
					`
				)
				.join("&");
			let response = await fetch(
				`http://localhost:8000/auth/users?search=${searchCriteria}&${excludeString}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			response = await response.json();
			if (response.error) throw new Error(response.error);
			return response;
		} catch (err) {
			throw new Error(err.message);
		}
	};

	const respondToInvitation = async (meetingId, response) => {
		try {
			let res = await fetch(
				`http://localhost:8000/meeting/${response}/${meetingId}`,
				{
					method: "PATCH",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			res = await res.json();
			console.log(res);
		} catch (err) {
			console.log(err.message);
		}
	};

	const meetingAttendees = !!meetingDetails
		? meetingDetails.attendees.map((attendee) => {
				let indicator = (
					<HelpOutline fontSize="small" style={{ color: "grey" }} />
				);
				if (attendee.status === "ACCEPT")
					indicator = (
						<CheckCircleOutline
							fontSize="small"
							style={{ color: "#339D64" }}
						/>
					);
				if (attendee.status === "REJECT")
					indicator = (
						<CancelOutlined
							fontSize="small"
							style={{ color: "indianred" }}
						/>
					);

				return (
					<div
						key={attendee._id}
						className={classes["event-attendee"]}
					>
						{indicator}
						<div>{attendee.email}</div>
					</div>
				);
		  })
		: [];

	const _user =
		meetingDetails &&
		meetingDetails.attendees.find(
			(attendee) => attendee.email === userEmail
		);
	const userStatus = _user && _user.status;
	const dateValidity =
		new Date().getDate() >= selDate &&
		new Date().getMonth() >= selMonth &&
		new Date().getFullYear() >= selYear;

	const statusButtons = render &&
		dateValidity &&
		!!meetingDetails &&
		userStatus === "NO ANSWER" && (
			<div
				className={`${classes["btn-grp"]} ${classes["status-update"]}`}
			>
				<Button
					shape="round"
					family="primary"
					color="#548385"
					onClickHandler={respondToInvitation.bind(
						this,
						meetingDetails._id,
						"accept"
					)}
				>
					<Done fontSize="small" />
				</Button>
				<Button
					shape="round"
					family="primary"
					color="indianred"
					onClickHandler={respondToInvitation.bind(
						this,
						meetingDetails._id,
						"reject"
					)}
				>
					<Clear fontSize="small" />
				</Button>
			</div>
		);

	const editParticipationButtons = dateValidity &&
		userStatus === "ACCEPT" && (
			<div className={classes["btn-grp"]}>
				<Button
					type="none"
					family="primary"
					color="#548385"
					onClickHandler={onToggleModal}
				>
					<PersonAdd fontSize="medium" />
					<div>Add Attendee</div>
				</Button>
				<Button
					type="none"
					family="secondary"
					color="indianred"
					onClickHandler={removeSelfHandler}
				>
					<RemoveCircle fontSize="medium" />
					<div>Excuse Yourself</div>
				</Button>
			</div>
		);

	return (
		render &&
		!!meetingDetails && (
			<Fragment>
				<Modal showModal={attendeeModal} onToggleModal={onToggleModal}>
					<MultiSelect
						getItems={getItemsHandler}
						selectedItems={attendees}
						onSelectItem={selectItemHandler}
						onDeselectItem={unSelectItemHandler}
					/>
					<Button
						type="secondary"
						color="#7B6F14"
						onClickHandler={addNewAttendees}
					>
						<ThumbUp />
						Done
					</Button>
				</Modal>

				<div
					className={`${classes["event-details"]} 
                          ${!!meetingDetails ? classes.show : classes.hide}`}
					onAnimationEnd={onUnmount}
				>
					<div className={classes["event-details__header"]}>
						<h2 className={classes["event-header__title"]}>
							{meetingDetails.title}
						</h2>
						<div className={classes["event-header__date-n-time"]}>
							<p className={classes["event-header__date"]}>
								{`${date.getDate()} ${
									monthNames[date.getMonth()]
								}, ${date.getFullYear()}`}
							</p>
							<div className={classes["event-header__time"]}>
								<p
									className={
										classes["event-header__startTime"]
									}
								>
									{meetingDetails.startTime}
								</p>
								-
								<p className={classes["event-header__endTime"]}>
									{meetingDetails.endTime}
								</p>
							</div>
							{statusButtons}
						</div>
					</div>
					<div className={classes["event-scrollable-section"]}>
						<p className={classes["event-description"]}>
							{meetingDetails.description}
						</p>
						<div className={classes["event-attendees"]}>
							{meetingAttendees}
						</div>
					</div>
					{editParticipationButtons}
				</div>
			</Fragment>
		)
	);
};

export default EventDetails;
