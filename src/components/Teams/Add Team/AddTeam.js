import classes from "./AddTeam.module.css";
import Button from "../../../UI/Button/Button";
import MemberAddModal from "../../../utils/Member Modal Helper/MemberModal";
import { notificationActions } from "../../../store/NotificationStore";

import { GroupAdd, PersonAdd } from "@material-ui/icons";
import { useState, useRef, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

const AddTeam = (props) => {
	const [members, setMembers] = useState([]);
	const [showModal, setShowModal] = useState(false);

	const onToggleModal = (e) => {
		e.preventDefault();
		setShowModal((prev) => !prev);
	};

	const token = useSelector((state) => state.authentication.token);
	const dispatch = useDispatch();

	const titleRef = useRef();
	const descriptionRef = useRef();

	const onSubmitFormHandler = async (e) => {
		e.preventDefault();

		try {
			const team = {
				title: titleRef.current.value,
				description: descriptionRef.current.value,
				members: members.map((member) => member.email),
			};
			console.log(team);
			let res = await fetch("http://localhost:8000/team/add", {
				method: "POST",
				body: JSON.stringify({ ...team }),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			res = await res.json();
			if (res.error) throw new Error(res.error);
			dispatch(
				notificationActions.setNotification({
					title: "TEAM CREATED",
					message: "You have successfully created a team",
					type: "SUCCESS",
				})
			);
		} catch (err) {
			dispatch(
				notificationActions.setNotification({
					title: "Error occured",
					message: err.message,
					type: "DANGER",
				})
			);
		} finally {
			titleRef.current.value = "";
			descriptionRef.current.value = "";
			setMembers([]);
			onToggleModal(e);
		}
	};

	const getUsersHandler = async (searchCriteria) => {
		try {
			let response = await fetch(
				`http://localhost:8000/auth/users?search=${searchCriteria}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			response = await response.json();
			if (response.error) throw new Error(response.error);
			return response;
		} catch (err) {
			dispatch(
				notificationActions.setNotification({
					title: "Error occured",
					message: err.message,
					type: "DANGER",
				})
			);
		}
	};

	return (
		<Fragment>
			<MemberAddModal
				members={members}
				setMembers={setMembers}
				level={2}
				getItemsHandler={getUsersHandler}
				onSubmitHandler={onToggleModal}
				showModal={showModal}
				setShowModal={setShowModal}
			/>

			<form action="" method="post" className={classes["create-team"]}>
				<input
					ref={titleRef}
					type="text"
					name="team-title"
					id={classes["create-team-title"]}
					required
					placeholder="Enter team title"
				/>
				<textarea
					ref={descriptionRef}
					name="team-description"
					id={classes["create-team-description"]}
					cols="30"
					rows="1"
					placeholder="What the team is about?"
				></textarea>
				<div className={classes["btn-grp"]}>
					<Button
						color="#548385"
						family="primary"
						onClickHandler={onToggleModal}
					>
						<PersonAdd fontSize="small" />
						Add Member
					</Button>
					<Button
						color="#548385"
						family="secondary"
						onClickHandler={onSubmitFormHandler}
					>
						<GroupAdd fontSize="small" />
						Create Team
					</Button>
				</div>
			</form>
		</Fragment>
	);
};

export default AddTeam;
