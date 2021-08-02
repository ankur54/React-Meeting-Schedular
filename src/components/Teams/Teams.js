import Modal from "../../UI/Modal Container/Modal";
import AddTeam from "./Add Team/AddTeam";
import TeamCards from "./Team Cards/TeamCards";
import { teamSocketConfig } from "../../utils/Socket Config/Socket-Team_Config";
import { teamActions } from "../../store/TeamStore";
import { fetchTeams } from "../../store/TeamActions";

import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Teams = (props) => {
	const { showModal, onToggleModal } = props;
	const dispatch = useDispatch();
	const token = useSelector((state) => state.authentication.token);
	const userId = useSelector((state) => state.authentication.userId);

	useEffect(() => {
        dispatch(fetchTeams(token));
        teamSocketConfig(dispatch, userId)
	}, []);

	return (
		<Fragment>
			<Modal showModal={showModal} onToggleModal={onToggleModal}>
				<AddTeam />
			</Modal>
			<TeamCards />
		</Fragment>
	);
};

export default Teams;
