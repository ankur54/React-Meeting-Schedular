import { Fragment, useState } from "react";

const Input = (props) => {
	const {
		type,
		name,
		id,
		classes,
		placeholder,
		validator,
		setFormFieldHandler,
	} = props;
	const [inputValue, setInputValue] = useState("");
	const [inputTouched, setInputTouched] = useState(false);
	const onChangeHandler = (e) => {
		setInputValue(e.target.value);
		setFormFieldHandler(name, e.target.value)
	};
	const onInputTouch = (e) => {
		setInputTouched(true);
	};
	let isInputValid = false;
	let isInputValidMessage = "";
	try {
		inputTouched && validator(inputValue);
		isInputValid = true;
	} catch (err) {
		isInputValidMessage = err.message;
	}

	return (
		<Fragment>
			<input
				key={id}
				type={type}
				name={name}
				id={id}
				value={inputValue}
				className={`${classes.normal} ${
					!isInputValid && classes.invalid
				}`}
				placeholder={placeholder || "Enter the Input"}
				onChange={onChangeHandler}
				onBlur={onInputTouch}
			/>
			<p style={{ color: "indianred", margin: "1em 0.5em" }}>
				{isInputValidMessage}
			</p>
		</Fragment>
	);
};

export default Input;
