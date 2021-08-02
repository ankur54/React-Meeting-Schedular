import classes from "./AddTeam.module.css";
import Button from "../../../UI/Button/Button";
import MemberAddModal from "../Member Modal Helper/MemberModal";

import { GroupAdd, PersonAdd, ThumbUp } from "@material-ui/icons";
import { useState, useRef, Fragment } from "react";
import { useSelector } from "react-redux";

const AddTeam = (props) => {
	const [members, setMembers] = useState([]);
	const [showModal, setShowModal] = useState(false);

    const onToggleModal = e => {
        e.preventDefault()
		setShowModal((prev) => !prev);
	};

	const token = useSelector((state) => state.authentication.token);

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
			// [ TODO ] show success message
			console.log(res);
		} catch (error) {
			// [ TODO ] show error message
			console.log(error.message);
		} finally {
			titleRef.current.value = "";
			descriptionRef.current.value = "";
            setMembers([]);
            onToggleModal(e)
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
			throw new Error(err.message);
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
				{/* <select name="select-team-member" id={classes['select-team-member']}>
                            <option>Choose an member</option>
                            <option value="user.name@mail.domain">member 1</option>
                            <option value="user.name@mail.domain">member 2</option>
                            <option value="user.name@mail.domain">member 3</option>
                            <option value="user.name@mail.domain">member 4</option>
                            <option value="user.name@mail.domain">member 5</option>
                            <option value="user.name@mail.domain">member 6</option>
                            <option value="user.name@mail.domain">member 7</option>
                            <option value="user.name@mail.domain">member 8</option>
                            <option value="user.name@mail.domain">member 9</option>
                            <option value="user.name@mail.domain">member 10</option>
                        </select> */}
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
