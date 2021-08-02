import classes from "./CalendarEvents.module.css";

import Calendar from "./Calendar/Calendar";
import AddMeetingForm from "./Add Meeting Form/AddMeetingForm";
import EventDetails from "./Event Details/EventDetails";

const CalendarEvents = (props) => {
	const { displayForm } = props;

	return (
		<section className={classes["calendar-operation"]}>
			<Calendar />
			<AddMeetingForm displayForm={displayForm} />
			<EventDetails />
		</section>
	);
};

export default CalendarEvents;
