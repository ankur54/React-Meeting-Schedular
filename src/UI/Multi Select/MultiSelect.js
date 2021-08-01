import { useState } from "react";

import classes from "./MultiSelect.module.css";
import ItemsList from "./ItemsList/ItemsList";
import SelectedItems from "./SelectedItems/SelectedItems";

export default function App(props) {
	const { getItems, selectedItems, onSelectItem, onDeselectItem } = props;
	const [items, setItems] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	// let filteredItems = filterItems(items, searchInput);
	// filteredItems.sort((itemA, itemB) => itemA.name.localeCompare(itemB.name));

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
		setTimeout(async () => {
			try {
				const _items = await getItems(e.target.value);
				setItems(_items);
			} catch (err) {
				console.log(err.message);
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
