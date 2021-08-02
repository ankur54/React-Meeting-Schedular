import classes from "./TeamCards.module.css";
import TeamCard from "./Team Card/TeamCard";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const TeamCards = (props) => {
	const teams = useSelector((state) => state.team.teams);
	
	const teamList = teams.map((team) => <TeamCard teamDetails={team} />);

	return <div className={classes["teams-list"]}>{teamList}</div>;
};

export default TeamCards;
