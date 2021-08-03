import classes from "./SearchResults.module.css";
import SearchView from "./Search View/SearchView";
import SearchResult from "./Search Result/SearchResult";

import { useEffect, useState } from "react";

const SearchResults = (props) => {
	const { searchResults } = props;
	const [selectedMeeting, setSelectedMeeting] = useState(null);
	const onMeetingSelecteHandler = (idx) => {
		setSelectedMeeting(searchResults[idx]);
	};

	useEffect(() => {
		return () => {
			setSelectedMeeting(null);
		};
	}, []);

	const searchResultsList = searchResults.map((result, idx) => {
		return (
			<SearchResult
				key={result._id}
				title={result.title}
				date={result.date}
				startTime={result.startTime}
				endTime={result.endTime}
				onClickHandler={onMeetingSelecteHandler.bind(this, idx)}
			/>
		);
	});

	return (
		<div className={classes["search-results"]}>
			<div className={classes["search-list"]}>{searchResultsList}</div>
			{searchResults.length > 0 && (
				<SearchView meeting={selectedMeeting} />
			)}
		</div>
	);
};

export default SearchResults;
