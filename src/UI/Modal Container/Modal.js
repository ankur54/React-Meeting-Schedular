import classes from "./Modal.module.css";

import ReactDOM from "react-dom";

const ModalComponent = (props) => {
	let { showModal, level, onToggleModal, children } = props;
	const stopPropagation = (e) => e.stopPropagation();
	const onClickHandler = (e) => {
		stopPropagation(e);
		onToggleModal(e);
	};

	level = level || 1;
	return (
		<div
			style={{ zIndex: level * 2 }}
			className={`${classes["modal-container"]} ${
				showModal && classes.show
			}`}
			onClick={onClickHandler}
		>
			<div className={classes["modal"]} onClick={stopPropagation}>
				{children}
			</div>
		</div>
	);
};

const Modal = (props) => {
	let { showModal, level, onToggleModal, children } = props;

	return ReactDOM.createPortal(
		<ModalComponent
			showModal={showModal}
			level={level}
			onToggleModal={onToggleModal}
		>
			{children}
		</ModalComponent>,
		document.getElementById("modal")
	);
};

export default Modal;
