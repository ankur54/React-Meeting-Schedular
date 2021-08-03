import Input from "./Input/Input";
import Button from "../Button/Button";
import { useState } from "react";

const Form = (props) => {
	const { color, classes, inputList, buttonList } = props;
	const [formField, setFormField] = useState({});

	const onChangeHandler = (key, value) => {
		setFormField((prev) => {
			return {
				...prev,
				[key]: value,
			};
		});
	};

	const form = inputList.map((input) => (
		<fieldset className={classes["auth-fieldset"]}>
			<label htmlFor={input.name}>{input.label}</label>
			<Input
				type={input.type}
				name={input.name}
				id={input.name}
				classes={{
					normal: classes["auth-form-input"],
					invalid: classes["invalid"],
				}}
				setFormFieldHandler={onChangeHandler}
				validator={input.validator}
				placeholder={input.placeholder}
			/>
		</fieldset>
	));

	const buttons = buttonList.map((btnConfig) => (
		<Button
			key={btnConfig.key}
			type={btnConfig.type}
			family={btnConfig.family}
			primaryColor={btnConfig.color}
			secondaryColor="white"
			onClickHandler={btnConfig.onClickHandler.bind(this, {
				...formField,
			})}
			className={btnConfig.className}
		>
			{btnConfig.text}
		</Button>
	));

	return (
		<form className={classes["auth-form"]} action="" method="POST">
			{form}
			{buttons}
		</form>
	);
};

export default Form;
