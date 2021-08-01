import classes from "./Schedule.module.css";
import TimeManager from "./Time Manager/TimeManager";

import { useSelector } from 'react-redux'

const Schedule = () => {
	const date = useSelector((state) => state.application.date);
	const month = useSelector((state) => state.application.month);
	const year = useSelector((state) => state.application.year);

	const dateString = new Date(year, month, date)
        .toLocaleDateString('en-GB', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    
    const day = dateString.split(' ')[0].slice(0, -1)
    const monthName = dateString.split(" ")[2];

	return (
		<section className={classes["daily-schedule"]}>
			<h2
				className={classes["today-date"]}
			>{`${date} ${monthName}, ${year}`}</h2>
			<h3 className={classes["today-day"]}>{`${day}`}</h3>
			<TimeManager />
		</section>
	);
};

export default Schedule;
