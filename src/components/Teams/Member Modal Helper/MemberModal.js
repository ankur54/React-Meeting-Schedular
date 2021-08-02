import Modal from "../../../UI/Modal Container/Modal";
import MultiSelect from "../../../UI/Multi Select/MultiSelect";
import Button from "../../../UI/Button/Button";

import { ThumbUp } from "@material-ui/icons";

const MemberAddModal = ({
	members,
	setMembers,
	level,
	getItemsHandler,
	onSubmitHandler,
	showModal,
	setShowModal,
}) => {
	const selectItemHandler = (user) => {
		setMembers((prev) => {
			const items = [...prev];
			items.push(user);
			return items;
		});
	};

	const unSelectItemHandler = (user) => {
		setMembers((prev) => {
			const items = [...prev];
			return items.filter((item) => item._id !== user._id);
		});
	};

	const onToggleModal = (e) => {
		setShowModal((prev) => !prev);
	};

	return (
		<Modal
			level={level}
			showModal={showModal}
			onToggleModal={onToggleModal}
		>
			<MultiSelect
				getItems={getItemsHandler}
				selectedItems={members}
				onSelectItem={selectItemHandler}
				onDeselectItem={unSelectItemHandler}
			/>
			<Button
				type="secondary"
				color="#7B6F14"
				onClickHandler={onSubmitHandler}
			>
				<ThumbUp />
				Done
			</Button>
		</Modal>
	);
};

export default MemberAddModal;
