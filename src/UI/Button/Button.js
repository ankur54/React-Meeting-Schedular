import { useState } from "react";
import classes from "./Button.module.css";

const Button = (props) => {
	const { type, family, shape, color, onClickHandler, children } = props;
	const [hover, setHover] = useState(false);
	const onHoverHandler = () => {
		setHover(true);
	};

	const onNotHoverHandler = () => {
		setHover(false);
	};

	return (
		<button
			className={classes.button}
			onMouseEnter={onHoverHandler}
			onMouseLeave={onNotHoverHandler}
			onClick={onClickHandler}
			type={type}
			style={{
				color:
					(family === "primary" && !hover) ||
					(family === "secondary" && hover)
						? color
						: "#cdcdcd",
				backgroundColor:
					(family === "primary" && !hover) ||
					(family === "secondary" && hover)
						? "transparent"
						: color,
				borderRadius: shape === "round" && "100%",
				padding: shape === "round" && "0.5em",
				border: `1px solid ${color}`,
			}}
		>
			{children}
		</button>
	);
};

export default Button;
