import { Person } from "@material-ui/icons";
import { Fragment } from "react";

import classes from "./SearchView.module.css";

const SearchView = ({ meeting }) => {
	let content = (
		<div className={classes["default-content"]}>No Meeting Selected</div>
	);
	// title, description, startTime, endTime, date, organizer, attendees
	if (meeting) {
		const {
			_id,
			title,
			description,
			date,
			startTime,
			endTime,
			organizer,
			attendees,
		} = meeting;

		const _date = new Date(date).toLocaleDateString("en-gb", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});

		content = (
			<Fragment>
				<div className={classes["meeting-header"]}>
					<h1
						className={`
                            ${classes.header} 
                            ${classes["meeting-title"]}
                        `}
					>
						{title}
					</h1>
					<h3
						className={`
                            ${classes["sub-header"]}
                        `}
					>
						{_date}
					</h3>
					<div className={classes.time}>
						<h3
							className={`
                                ${classes["sub-header"]}
                            `}
						>
							{startTime}
						</h3>
						-
						<h3
							className={`
                                ${classes["sub-header"]}
                            `}
						>
							{endTime}
						</h3>
					</div>
					{/* {statusButtons} */}
				</div>
				<p
					className={`
                        ${classes.content}
                    `}
				>
					{description}
				</p>
				<div>
					<span className={classes["sub-header__title"]}>
						Organizer{" "}
					</span>
					<div className={classes.organizer}>
						<Person
							style={{
								fontSize: "2em",
								padding: "0.2em",
								color: "white",
								borderRadius: "100%",
								backgroundColor: "grey",
							}}
						/>
						<h3
							className={`
                                ${classes["sub-header"]}
                            `}
						>
							<div className={classes["user-name"]}>
								{organizer.name}
							</div>
							( {organizer.email} )
						</h3>
					</div>
				</div>
				<span className={classes["sub-header__title"]}>Attendees</span>
				<div className={classes.attendees}>
					{attendees.map((attendee) => (
						<div key={attendee._id} className={classes.attendee}>
							<Person
								style={{
									padding: "0.1em",
									fontSize: "2em",
									backgroundColor: "grey",
									color: "white",
									borderRadius: "100%",
								}}
							/>
							<h4
								className={`
                                ${classes["sub-header"]}
                            `}
							>
								<div className={classes["user-name"]}>
									{attendee.name}
								</div>
								( {attendee.email} )
							</h4>
						</div>
					))}
				</div>
			</Fragment>
		);
	}

	return (
		<div
			className={`${classes["search-view"]} ${!!meeting && classes.show}`}
		>
			{content}
		</div>
	);
};

export default SearchView;
