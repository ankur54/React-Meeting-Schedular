import { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PersonAdd, ThumbUp, VideoCall } from "@material-ui/icons";

import classes from "./AddMeetingForm.module.css";
import timeFormatter from "../../../../utils/Time Formater/TimeFormatter";
import Modal from "../../../../UI/Modal Container/Modal";
import Button from "../../../../UI/Button/Button";
import MultiSelect from "../../../../UI/Multi Select/MultiSelect";
import { notificationActions } from "../../../../store/NotificationStore";

const AddMeetingForm = ({ displayForm }) => {
	const [render, setRender] = useState(displayForm);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [attendees, setAttendees] = useState([]);
	const [attendeeModal, setAttendeeModal] = useState(false);

	const [titleTouched, setTitleTouched] = useState(false);
	const [descriptionTouched, setDescriptionTouched] = useState(false);
	const [dateTouched, setDateTouched] = useState(false);
	const [startTimeTouched, setStartTimeTouched] = useState(false);
	const [endTimeTouched, setEndTimeTouched] = useState(false);

	const titleValidator = (input) => {
		if (input === "") throw new Error("Title cannot be empty");
	};
	const descriptionValidator = (input) => {
		if (input === "") throw new Error("Description cannot be empty");
	};
	const dateValidator = (input) => {
		if (input === "") throw new Error("Input cannot be empty");
		let [year, month, day] = input.split("-");
		day = +day;
		month = +month;
		year = +year;
		const currDate = new Date().getDate();
		const currMonth = new Date().getMonth() + 1;
		const currYear = new Date().getFullYear();
		if (year < currYear || month < currMonth || day < currDate)
			throw new Error(
				"Meetings are allowed to be scheduled only in future"
			);
	};
	const startTimeValidator = (input, dateString) => {
		if (input === "") throw new Error("Input cannot be empty");
		let [hr, min] = input.split(":");
		let [year, month, day] = dateString.split("-");
		day = +day;
		month = +month;
		year = +year;
		hr = +hr;
		min = +min;
		const currDate = new Date().getDate();
		const currMonth = new Date().getMonth() + 1;
		const currYear = new Date().getFullYear();
		const currHr = new Date().getHours();
		const currMin = new Date().getMinutes();
		if (
			day === currDate &&
			month === currMonth &&
			currYear === year &&
			(currHr > hr || currMin > min)
		)
			throw new Error(
				"Start Time should atleast be curr Time for the current date"
			);
	};
	const endTimeValidator = (input, startTimeString) => {
		if (input === "") throw new Error("Input cannot be empty");
		let [hr, min] = input.split(":");
		let [startHr, startMin] = startTime.split(":");
		hr = +hr;
		min = +min;
		startHr = +startHr;
		startMin = +startMin;
		if (hr < startHr || (hr === startHr && min < startMin))
			throw new Error("End Time should be greater than start time");
	};

	const token = useSelector((state) => state.authentication.token);
	const dispatch = useDispatch();

	useEffect(() => {
		if (displayForm) setRender(true);
	}, [displayForm]);

	const onUnMount = () => {
		if (!displayForm) setRender(false);
	};
	const onChangeTitle = (e) => setTitle(e.target.value);
	const onChangeDescription = (e) => setDescription(e.target.value);
	const onChangeDate = (e) => setDate(e.target.value);
	const onChangeStartTime = (e) => setStartTime(e.target.value);
	const onChangeEndTime = (e) => setEndTime(e.target.value);

	const onTitleTouched = (e) => setTitleTouched(true);
	const onDescriptionTouched = (e) => setDescriptionTouched(true);
	const onDateTouched = (e) => setDateTouched(true);
	const onStartTimeTouched = (e) => setStartTimeTouched(true);
	const onEndTimeTouched = (e) => setEndTimeTouched(true);

	let titleIsValidMessage = null;
	let descriptionIsValidMessage = null;
	let dateIsValidMessage = null;
	let startTimeIsValidMessage = null;
	let endTimeIsValidMessage = null;

	let isTitleValid = false;
	let isDateValid = false;
	let isStartTimeValid = false;
	let isEndTimeValid = false;
	let isDescriptionValid = false;

	try {
		if (titleTouched) {
			titleValidator(title);
			isTitleValid = true;
		}
	} catch (err) {
		titleIsValidMessage = err.message;
		isTitleValid = false;
	}

	try {
		if (descriptionTouched) {
			descriptionValidator(description);
			isDescriptionValid = true;
		}
	} catch (err) {
		descriptionIsValidMessage = err.message;
		isDescriptionValid = false;
	}

	try {
		if (dateTouched) {
			dateValidator(date);
			isDateValid = true;
		}
	} catch (err) {
		dateIsValidMessage = err.message;
		isDateValid = false;
	}

	try {
		if (startTimeTouched) {
			startTimeValidator(startTime, date);
			isStartTimeValid = true;
		}
	} catch (err) {
		startTimeIsValidMessage = err.message;
		isStartTimeValid = false;
	}

	try {
		if (endTimeTouched) {
			endTimeValidator(endTime, date);
			isEndTimeValid = true;
		}
	} catch (err) {
		endTimeIsValidMessage = err.message;
		isEndTimeValid = false;
	}

	let isFormValid =
		isTitleValid &&
		isDateValid &&
		isStartTimeValid &&
		isEndTimeValid &&
		isDescriptionValid;

	const onToggleModal = (e) => {
		e.preventDefault();
		setAttendeeModal((prev) => !prev);
	};
	const onSubmitFormHandler = async (e) => {
		e.preventDefault();

		try {
			const user = {
				title,
				description,
				date,
				startTime: timeFormatter(startTime),
				endTime: timeFormatter(endTime),
				attendees: attendees.map((attendee) => attendee.email),
			};
			console.log(user);
			let res = await fetch("http://localhost:8000/meeting/add", {
				method: "POST",
				body: JSON.stringify({ ...user }),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			res = await res.json();
			if (res.error) throw new Error(res.error);
			dispatch(
				notificationActions.setNotification({
					title: "SUCCESSFUL",
					message: "Meeting successfully created",
					type: "SUCCESS",
				})
			);
		} catch (err) {
			dispatch(
				notificationActions.setNotification({
					title: "Error occured",
					message: err.message,
					type: "DANGER",
				})
			);
		} finally {
			setTitle("");
			setDate("");
			setDescription("");
			setStartTime("");
			setEndTime("");
			setAttendees([]);
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
			return items.filter((item) => user.email !== item.email);
		});
	};

	const getItemsHandler = async (searchCriteria) => {
		try {
			let response = await fetch(
				`http://localhost:8000/auth/users?search=${searchCriteria}`,
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
			dispatch(
				notificationActions.setNotification({
					title: "Error occured",
					message: err.message,
					type: "DANGER",
				})
			);
		}
	};

	const dateObj = new Date();
	const currDate = `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()}`;
	const currTime = `${dateObj.getHours()}:${dateObj.getMinutes()}`;

	return (
		render && (
			<Fragment>
				<Modal
					level={2}
					showModal={attendeeModal}
					onToggleModal={onToggleModal}
				>
					<MultiSelect
						getItems={getItemsHandler}
						selectedItems={attendees}
						onSelectItem={selectItemHandler}
						onDeselectItem={unSelectItemHandler}
					/>
					<Button
						type="secondary"
						color="#7B6F14"
						onClickHandler={onToggleModal}
					>
						<ThumbUp />
						Done
					</Button>
				</Modal>
				<form
					action=""
					method="post"
					onSubmit={onSubmitFormHandler}
					className={`${classes["create-meeting"]} ${
						displayForm ? classes.show : classes.hide
					}`}
					onAnimationEnd={onUnMount}
				>
					<input
						onChange={onChangeTitle}
						onBlur={onTitleTouched}
						type="text"
						name="meeting-title"
						className={!!titleIsValidMessage && classes.invalid}
						id={classes["create-meeting-title"]}
						required
						placeholder="Enter meeting title"
						value={title}
					/>
					<p className={classes["input-error-message"]}>
						{titleIsValidMessage}
					</p>
					<div className={classes["meeting-date-container"]}>
						<label>Select meeting date</label>
						<input
							onChange={onChangeDate}
							onBlur={onDateTouched}
							type="date"
							name="meeting-date"
							className={!!dateIsValidMessage && classes.invalid}
							id={classes["create-meeting-date"]}
							value={date}
							min={currDate}
						/>
						<p className={classes["input-error-message"]}>
							{dateIsValidMessage}
						</p>
					</div>
					<div className={classes["start-time-container"]}>
						<label>Start Time</label>
						<input
							onChange={onChangeStartTime}
							onBlur={onStartTimeTouched}
							type="time"
							name="meeting-start-time"
							className={
								!!startTimeIsValidMessage && classes.invalid
							}
							id={classes["create-meeting-start-time"]}
							value={startTime}
							min={currTime}
						/>
						<p className={classes["input-error-message"]}>
							{startTimeIsValidMessage}
						</p>
					</div>
					<div className={classes["end-time-container"]}>
						<label>End Time</label>
						<input
							onChange={onChangeEndTime}
							onBlur={onEndTimeTouched}
							className={
								!!endTimeIsValidMessage && classes.invalid
							}
							type="time"
							name="meeting-end-time"
							id={classes["create-meeting-end-time"]}
							value={endTime}
							min={startTime}
						/>
						<p className={classes["input-error-message"]}>
							{endTimeIsValidMessage}
						</p>
					</div>
					<input
						onChange={onChangeDescription}
						onBlur={onDescriptionTouched}
						type="text"
						name="meeting-description"
						className={
							!!descriptionIsValidMessage && classes.invalid
						}
						id={classes["create-meeting-description"]}
						placeholder="What the meeting is about?"
						value={description}
					/>
					<p className={classes["input-error-message"]}>
						{descriptionIsValidMessage}
					</p>

					<div className={classes["btn-grp"]}>
						<Button
							family="primary"
							color="#548385"
							onClickHandler={onToggleModal}
						>
							<PersonAdd fontSize="medium" />
							<div>Add Attendee</div>
						</Button>
						<Button
							type="submit"
							family="secondary"
							color="#548385"
							disabled={!isFormValid}
							onClickHandler={onSubmitFormHandler}
						>
							<VideoCall fontSize="medium" />
							<div>Create Meeting</div>
						</Button>
					</div>
				</form>
			</Fragment>
		)
	);
};

export default AddMeetingForm;
