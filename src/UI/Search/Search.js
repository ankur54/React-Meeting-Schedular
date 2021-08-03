import classes from "./Search.module.css";
import Button from "../Button/Button";

import SearchIcon from "@material-ui/icons/Search";
import { useState } from "react";

const Search = (props) => {
	const { onClickHandler } = props;
	const [search, setSearch] = useState("");
	const onInputChange = (e) => {
		setSearch(e.target.value);
		setTimeout(() => {
			onClickHandler(e.target.value);
		}, 1000);
	};

	return (
		<div className={classes["search-bar"]}>
			<input
				className={classes["search-bar__input"]}
				placeholder="Enter the description u want to search for"
				onChange={onInputChange}
				value={search}
			/>
			<Button
				type="submit"
				shape="round"
				onClickHandler={onClickHandler.bind(this, search)}
			>
				<SearchIcon fontSize="small" />
			</Button>
		</div>
	);
};

export default Search;
