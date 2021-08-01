import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import classes from "./Calendar.module.css";
import { monthNames, dayNames } from "../../../../utils/Calendar/Calendar";
import { applicationActions } from "../../../../store/AppStore";

const Calendar = (props) => {
    const month = useSelector((state) => state.application.month);
    const year = useSelector((state) => state.application.year);
	const startTime = useSelector((state) => state.application.startTime);
	const endTime = useSelector((state) => state.application.endTime);
	const [showMonthSelector, setShowMonthSelector] = useState(false);
	const [dateClicked, setDateClicked] = useState(new Date().getDate());

	const dispatch = useDispatch();

	const changeMonthHandler = (monthIdx) => {
		setShowMonthSelector((prev) => (prev = false));
		dispatch(applicationActions.changeMonth(monthIdx))
	};

	const selectMonthHandler = () => {
		setShowMonthSelector((prev) => (prev = true));
	};

	const nextYearHandler = () => {
		dispatch(applicationActions.incrementYear());
	};

	const prevYearHandler = () => {
		dispatch(applicationActions.decrementYear());
	};

	const changeStartTimeHandler = (e) => {
		dispatch(applicationActions.setStartTime(e.target.value));
	};

	const changeEndTimeHandler = (e) => {
		dispatch(applicationActions.setEndTime(e.target.value));
	};

	const dateClickHandler = (dayNumber) => {
		setDateClicked(dayNumber);
		dispatch(applicationActions.changeDate(dayNumber));
	};

	const isLeapYear = (year) => {
		return (
			(year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
			(year % 100 === 0 && year % 400 === 0)
		);
	};

	const getFebDays = (year) => {
		return isLeapYear(year) ? 29 : 28;
	};

	const generateCalendar = () => {
		const daysOfMonth = [
			31,
			getFebDays(year),
			31,
			30,
			31,
			30,
			31,
			31,
			30,
			31,
			30,
			31,
		];
		const calendarDays = [];
		const currDate = new Date();
		const firstDay = new Date(year, month, 1);

		for (let i = 0; i <= daysOfMonth[month] + firstDay.getDay() - 1; i++) {
			let dayElement = (
				<div
					key={`blank-day-${i}`}
					className={classes["days-number"]}
				></div>
			);

			if (i >= firstDay.getDay()) {
				const dayNumber = i - firstDay.getDay() + 1;
				const isCurrDate =
					dayNumber === currDate.getDate() &&
					year === currDate.getFullYear() &&
					month === currDate.getMonth();
				const dateString = new Date(year, month, dayNumber).toLocaleDateString();
				dayElement = (
					<div
						key={dateString}
						className={`${classes["days-number"]} 
                                ${classes.show} 
                                ${isCurrDate && classes["curr-date"]} 
                                ${dateClicked === dayNumber && classes.active}`}
						onClick={dateClickHandler.bind(this, dayNumber)}
					>
						{dayNumber}
					</div>
				);
			}
			calendarDays.push(dayElement);
		}
		return calendarDays;
	};

	const monthBlocks = monthNames.map((month, monthIdx) => (
		<div
			key={`${month}-${monthIdx}`}
			className={classes["month-block"]}
			onClick={changeMonthHandler.bind(this, monthIdx)}
		>
			{month}
		</div>
	));

	return (
		<div className={classes.calendar}>
			<div
				className={`${classes["month-list"]} ${
					showMonthSelector && classes.show
				}`}
			>
				{monthBlocks}
			</div>
			<div className={classes["calendar-header"]}>
				<div className={classes["year-selector"]}>
					<NavigateNextIcon
						onClick={prevYearHandler}
						className={classes["prev-year"]}
					/>
					<span className={classes.year}>{year}</span>
					<NavigateNextIcon
						onClick={nextYearHandler}
						className={classes["next-year"]}
					/>
				</div>
				<div
					className={classes["month-selector"]}
					onClick={selectMonthHandler}
				>
					{monthNames[month]}
				</div>
				<input
					type="time"
					name="start-time"
					value={startTime}
					id={classes["filter-start-time"]}
					onChange={changeStartTimeHandler}
				/>
				<input
					type="time"
					name="end-time"
					value={endTime}
					id={classes["filter-end-time"]}
					onChange={changeEndTimeHandler}
				/>
			</div>
			<div className={classes["calendar-body"]}>
				<div className={classes["calendar-week-days"]}>
					{dayNames.map((dayName) => (
						<div key={dayName} className={classes["week-day"]}>
							{" "}
							{dayName.charAt(0)}
						</div>
					))}
				</div>
				<div className={classes["calendar-days"]}>
					{generateCalendar()}
				</div>
			</div>
		</div>
	);
};

export default Calendar;
