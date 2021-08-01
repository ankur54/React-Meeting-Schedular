import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import classes from "./CurrentTimeIndicator.module.css";
import { applicationActions } from "../../../../../store/AppStore";

const CurrentTimeIndicator = () => {
	const currMinute = useSelector((state) => state.application.currMinute);
	const currHour = useSelector((state) => state.application.currHour);
	let interval = null;
	const dispatch = useDispatch();

	useEffect(() => {
		interval = setInterval(() => {
			dispatch(applicationActions.incrementCurrMinute());
		}, 60 * 1000);
	});

	useEffect(() => {
		return () => {
			console.log("current timer unmounts");
			if (interval) clearInterval(interval);
		};
	}, []);

	const hr = currHour,
		min = currMinute;
	const acronym = hr >= 12 ? "pm" : "am";
	const now = `${hr < 10 ? "0" + hr : hr > 12 ? hr % 12 : hr}:${
		min < 10 ? "0" + min : min
	} ${acronym}`;

	return (
		<div
			style={{ top: `calc((5em / 60) * ${min})` }}
			className={`${classes["curr-time"]} ${classes.active}`}
		>
			{now}
		</div>
	);
};

export default CurrentTimeIndicator;
