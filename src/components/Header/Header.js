import classes from "./Header.module.css";
import Search from "../../UI/Search/Search";
import AddButton from "../../UI/Add Button/Add-Button";
import UserAccount from "../../UI/User Icon/User";
import Modal from "../../UI/Modal Container/Modal";
import SearchResults from "../../utils/Search Results/SearchResults";

import { SearchRounded } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useState, Fragment, useEffect } from "react";

const Header = (props) => {
	const {
		addClicked,
		onClickHandler,
		onChangeTab,
		currTab,
	} = props;

	const [searchClicked, setSearchClicked] = useState(false);
	const [meetingsList, setMeetingsList] = useState([]);
	
    const token = useSelector((state) => state.authentication.token);
	const user = useSelector((state) => {
		return {
			name: state.authentication.userName,
			email: state.authentication.userEmail,
		};
    });
    
    useEffect(() => {
        if (!searchClicked) setMeetingsList([])
    }, [searchClicked])

	const tabChangeHandler = (tabName) => {
		onChangeTab(tabName);
	};
	const onSearchClicked = () => {
		setSearchClicked((prev) => !prev);
	};
	const getSearchResults = async (input) => {
		try {
			console.log(input);
			const response = await fetch(
				`http://localhost:8000/meeting/filter?phrase=${input}`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response.status !== 200) {
				throw new Error(response.error);
			}

			const meetings = await response.json();
			setMeetingsList(meetings);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Fragment>
			<Modal showModal={searchClicked} onToggleModal={onSearchClicked}>
				<Search onClickHandler={getSearchResults} />
				<SearchResults searchResults={meetingsList} />
			</Modal>
			<header>
				<AddButton clicked={addClicked} onClick={onClickHandler} />
				<nav>
					<div
						className={`${classes.tab} ${
							currTab === "meeting" && classes["active"]
						}`}
						onClick={tabChangeHandler.bind(this, "meeting")}
					>
						Meeting
					</div>
					<div
						className={`${classes.tab} ${
							currTab === "team" && classes["active"]
						}`}
						onClick={tabChangeHandler.bind(this, "team")}
					>
						Teams
					</div>
				</nav>
				<button
					className={classes["search-btn"]}
					onClick={onSearchClicked}
				>
					<SearchRounded fontSize="small" />
				</button>
				<UserAccount userDetails={user} />
			</header>
		</Fragment>
	);
};

export default Header;
