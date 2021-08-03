import { useState } from "react";
import classes from "./Button.module.css";

const Button = (props) => {
	const {
		type,
		family,
		shape,
		primaryColor,
		secondaryColor,
		disabled,
		onClickHandler,
		className,
		children,
	} = props;
	const [hover, setHover] = useState(false);
	const onHoverHandler = () => {
		setHover(true);
	};

	const onNotHoverHandler = () => {
		setHover(false);
	};

	const onClick = (e) => {
		e.preventDefault()
		onClickHandler()
	}

	return (
		<button
			className={`${classes.button} ${className}`}
			onMouseEnter={onHoverHandler}
			onMouseLeave={onNotHoverHandler}
			onClick={onClick}
			disabled={!!disabled}
			type={type}
			style={{
				color:
					(family === "primary" && !hover) ||
					(family === "secondary" && hover)
						? primaryColor
						: secondaryColor,
				backgroundColor:
					(family === "primary" && !hover) ||
					(family === "secondary" && hover)
						? secondaryColor
						: primaryColor,
				borderRadius: shape === "round" && "100%",
				padding: shape === "round" && "0.5em",
				border: `1px solid ${primaryColor}`,
			}}
		>
			{children}
		</button>
	);
};

export default Button;
