import { Fragment, useState } from "react";

import classes from "./AuthForm.module.css";
import Form from "../Form/Form";

const AuthForm = (props) => {
	const [active, setActive] = useState(0);
	const { sections } = props;

	const onTabClickHandler = (idx) => {
		setActive(idx);
	};

	const LightenDarkenColor = (col, amt) => {
		var usePound = false;

		if (col[0] === "#") {
			col = col.slice(1);
			usePound = true;
		}

		var num = parseInt(col, 16);

		var r = (num >> 16) + amt;

		if (r > 255) r = 255;
		else if (r < 0) r = 0;

		var b = ((num >> 8) & 0x00ff) + amt;

		if (b > 255) b = 255;
		else if (b < 0) b = 0;

		var g = (num & 0x0000ff) + amt;

		if (g > 255) g = 255;
		else if (g < 0) g = 0;

		return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
	};

	const len = sections.length;
	const formTabs = sections.map((tab, idx) => {
		const next = sections[(idx + 1) % len];
		const darkHyue = LightenDarkenColor(next.hyue, -5);

		const link = (
			<span
				style={{ color: darkHyue }}
				onClick={onTabClickHandler.bind(this, (idx + 1) % len)}
				className={classes["form-tab__link"]}
			>
				{sections[(idx + 1) % len].title}
			</span>
		);

		return (
			<div key={tab.title} className={classes["form-tab"]}>
				<p className={classes["form-tab__text"]}>
					{tab.next} &nbsp;
					{link}
				</p>
			</div>
		);
	});
	const pages = sections.map((page) => {
		const darkHyue = LightenDarkenColor(page.hyue, -150);

		const buttonList = page.left.buttonList.map((btn) => {
			return {
				...btn,
				color: darkHyue,
				classes: classes["form-submit"],
			};
		});

		const form = (
			<Form
				classes={classes}
				inputList={page.left.inputList}
				buttonList={buttonList}
				color={page.hyue}
			/>
		);

		return (
			<Fragment key={page.title}>
				<div className={classes["left-panel"]}>
					<div className={classes["left-panel__header"]}>
						<h2
							className={classes["left-panel__header-title"]}
							style={{ color: darkHyue }}
						>
							{page.heading}
						</h2>
					</div>
					<div
						className={classes["hor-divider"]}
						style={{ backgroundColor: darkHyue }}
					></div>
					{form}
				</div>
				<div
					className={classes["right-panel"]}
					style={{ backgroundColor: page.hyue }}
				>
					<div
						className={classes["right-panel__header"]}
						style={{ color: darkHyue }}
					>
						<h1>{page.right.heading}</h1>
					</div>
					<div className={classes["form-image"]}>
						<img src={page.right.image} alt="login form" />
					</div>
				</div>
			</Fragment>
		);
	});

	return (
		<Fragment>
			{formTabs[active]}
			<div className={classes["form-content"]}>{pages[active]}</div>
		</Fragment>
	);
};

export default AuthForm;
