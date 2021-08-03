import { useState } from "react";
import { useDispatch } from "react-redux";

import classes from "./MultiSelect.module.css";
import ItemsList from "./ItemsList/ItemsList";
import SelectedItems from "./SelectedItems/SelectedItems";
import { notificationActions } from "../../store/NotificationStore";

export default function App(props) {
	const { getItems, selectedItems, onSelectItem, onDeselectItem } = props;
	const [items, setItems] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const dispatch = useDispatch();
	let timeout = null;

	const addSelectedItem = (idx) => {
		onSelectItem(items[idx]);
		setItems((prev) => {
			let items = [...prev];
			items.splice(idx, 1);
			return items;
		});
		setSearchInput("");
	};

	const onInputChangeHandler = (e) => {
		setSearchInput(e.target.value);
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(async () => {
			try {
				const _items = await getItems(e.target.value);
				setItems(_items);
			} catch (err) {
				dispatch(
					notificationActions.setNotification({
						title: "Error occured",
						message: err.message,
						type: "DANGER",
					})
				);
			}
		}, 2000);
	};

	const removeSelectedItem = (idx) => {
		const removedItem = selectedItems[idx];
		setItems((prev) => {
			const items = [...prev];
			items.push(removedItem);
			return items;
		});
		onDeselectItem(removedItem);
	};

	return (
		<div className={classes.App}>
			<div className={classes["multi-select-items"]}>
				<div className={classes["search-input"]}>
					<input
						className={classes["search-input-text"]}
						placeholder="Search"
						onChange={onInputChangeHandler}
						value={searchInput}
					/>
				</div>
				<SelectedItems
					items={selectedItems}
					onItemClick={removeSelectedItem}
				/>
				<ItemsList items={items} onItemClick={addSelectedItem} />
			</div>
		</div>
	);
}
