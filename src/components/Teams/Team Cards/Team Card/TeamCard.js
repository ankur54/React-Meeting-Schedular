import classes from "./TeamCard.module.css";
import Button from "../../../../UI/Button/Button";
import MemberAddModal from "../../Member Modal Helper/MemberModal";

import { PersonAdd, CancelRounded } from "@material-ui/icons";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";

const TeamCard = (props) => {
	const { teamDetails } = props;
	const [showMore, setShowMore] = useState(false);
	const [addedMembers, setAddedMembers] = useState([]);
	const [showModal, setShowModal] = useState(false);

	const token = useSelector((state) => state.authentication.token);
	const userEmail = useSelector((state) => state.authentication.userEmail);
	const members = teamDetails.members;

	const showMembers = members.slice(0, 3).map((member, i) => (
		<div key={i} className={`${classes["team-member"]} ${classes.show}`}>
			{member.name}
		</div>
	));

	const hideMembers =
		showMore &&
		members.slice(3).map((member, i) => (
			<div
				key={i}
				className={`${classes["team-member"]} ${
					showMore && classes.show
				}`}
			>
				{member.name}
			</div>
		));
    
	const onToggleModal = () => {
		setShowModal((prev) => !prev);
	};

	const onClickHandler = () => {
		setShowMore(true);
	};

	const addNewMembers = (e) => {
		const selectedEmail = teamDetails.members.map((member) => member.email);
		const newMembers = addedMembers.filter(
			(member) => !selectedEmail.includes(member.email)
		);

		try {
			newMembers.forEach(async (member) => {
				let response = await fetch(
					`http://localhost:8000/team/add-user/${teamDetails._id}`,
					{
						method: "PATCH",
						body: JSON.stringify({
							email: member.email,
						}),
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				);

				response = await response.json();
				if (response.error) throw new Error(response.error);
			});
		} catch (err) {
			console.log(err.message);
		} finally {
			setAddedMembers([]);
			onToggleModal(e);
		}
	};

	const getUsersHandler = async (searchCriteria) => {
		try {
			const excludeString = teamDetails.members
				.map(
					(member, idx) =>
						`
						exclude[${idx}][_id]=${member._id}&
						exclude[${idx}][name]=${member.name}&
						exclude[${idx}][email]=${member.email}
					`
				)
				.join("&");
			let response = await fetch(
				`http://localhost:8000/auth/users?search=${searchCriteria}&${excludeString}`,
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
			throw new Error(err.message);
		}
	};

	const removeSelfHandler = async (e) => {
		e.preventDefault();
		try {
			let response = await fetch(
				`http://localhost:8000/team/del-user/${teamDetails._id}`,
				{
					method: "PATCH",
					body: JSON.stringify({
						email: userEmail,
					}),
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			response = await response.json();
			if (response.error) throw new Error(response.error);
		} catch (err) {
			console.log(err.message);
		}
	};

	const rem = members.length > 3 && (
		<div
			style={{ display: showMore ? "none" : "inline-block" }}
			className={classes.rem}
			onClick={onClickHandler}
		>
			{members.length - 3} +
		</div>
	);
	return (
		<Fragment>
			<MemberAddModal
				members={addedMembers}
				setMembers={setAddedMembers}
				level={1}
				getItemsHandler={getUsersHandler}
				onSubmitHandler={addNewMembers}
				showModal={showModal}
				setShowModal={setShowModal}
			/>

			<div className={classes["team-card"]}>
				<h2 className={classes["team-card__title"]}>
					{teamDetails.title}
				</h2>
				<p className={classes["team-card__description"]}>
					{teamDetails.description}
				</p>
				<div className={classes["team-card__btn"]}>
					<Button
						family="primary"
						color="#548385"
						onClickHandler={onToggleModal}
					>
						<PersonAdd fontSize="medium" />
						Add Member
					</Button>
					<Button
						family="secondary"
						color="indianred"
						onClickHandler={removeSelfHandler}
					>
						<CancelRounded fontSize="medium" />
						Excuse Yourself
					</Button>
				</div>
				<div className={classes["team-members"]}>
					{showMembers}
					{hideMembers}
					{rem}
				</div>
			</div>
		</Fragment>
	);
};

export default TeamCard;
