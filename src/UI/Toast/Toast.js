import classes from "./Toast.module.css";
import { notificationActions } from "../../store/NotificationStore";

import { useEffect } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircle, HighlightOff, Info, Warning } from "@material-ui/icons";

const ToastElement = () => {
	const dispatch = useDispatch();
	const notification = useSelector((state) => state.notification);
	useEffect(() => {
		setTimeout(() => {
		    dispatch(notificationActions.removeNotification());
		}, 3 * 1000);
	}, []);

	let icon = null,
		color = null;
	if (notification.type === "SUCCESS") {
		color = "#49B181";
		icon = <CheckCircle fontSize="large" />;
	}
	if (notification.type === "WARNING") {
		color = "#EBD65F";
		icon = <Warning fontSize="large" />;
	}
	if (notification.type === "DANGER") {
		color = "#D37171";
		icon = <HighlightOff fontSize="large" />;
	}
	if (notification.type === "INFO") {
		color = "#568CCD";
		icon = <Info fontSize="large" />;
	}

	return (
		<div
			style={{ backgroundColor: color, color: "white" }}
			className={classes["notification"]}
		>
			{icon}
			<div className={classes["notification-content"]}>
				<h4 className={classes["notification-title"]}>
					{notification.title}
				</h4>
				<p className={classes["notification-message"]}>
					{notification.message}
				</p>
			</div>
		</div>
	);
};

const Toast = () => {
	return ReactDOM.createPortal(
		<ToastElement />,
		document.getElementById("notification")
	);
};

export default Toast;
