import { useReducer, useState } from "react";

import classes from "./MultiSelect.module.css";
import ItemsList from "./components/ItemsList/ItemsList";
import SelectedItems from "./components/SelectedItems/SelectedItems";

const filterItems = (state, action) => {
  if (!action) return state

  return state.filter(
    (item) =>
      item.name.toLowerCase().indexOf(action.toLowerCase()) > -1 ||
      item.email.toLowerCase().indexOf(action.toLowerCase()) > -1
  );
};

const items = [
  {
    _id: "435329kshfi2341",
    name: "Berlin Simps",
    email: "berlin.simps@mail.com",
  },
  {
    _id: "23452ikug2341g1",
    name: "Tokyo Ghoul",
    email: "tokyo.ghoul@mail.com",
  },
  {
    _id: "234209kjh234g1e",
    name: "He Man",
    email: "he.man@mail.com",
  },
  {
    _id: "345hjggf214j1gj",
    name: "Marco Polo",
    email: "marco.polo@mail.com",
  },
  {
    _id: "kjhhg24k12jhb12",
    name: "Tibetian Wolf",
    email: "tibetian.wolf@mail.com",
  },
  {
    _id: "kjhhg24k12jhb12",
    name: "Tibetian Wolf",
    email: "tibetian.wolf@mail.com",
  },
  {
    _id: "kjhhg24k12jhb12",
    name: "Tibetian Wolf",
    email: "tibetian.wolf@mail.com",
  },
  {
    _id: "kjhhg24k12jhb12",
    name: "Tibetian Wolf",
    email: "tibetian.wolf@mail.com",
  },
  {
    _id: "kjhhg24k12jhb12",
    name: "Tibetian Wolf",
    email: "tibetian.wolf@mail.com",
  },
];
const selectedItems = [];

export default function App(props) {
  const [listItems, setListItems] = useState(items);
  const [searchInput, setSearchInput] = useState("");
  const filteredItems = filterItems(listItems, searchInput);

  const addSelectedItem = (idx) => {
    selectedItems.push(filteredItems[idx]);
    setListItems((prev) => {
      const items = [...prev];
      const i = items.findIndex(
        (item) => filteredItems[idx].email === item.email
      );
      items.splice(i, 1);
      return items;
    });
    setSearchInput("");
  };

  const onInputChangeHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const removeSelectedItem = (idx) => {
    const removedItem = selectedItems.splice(idx, 1)[0];
    setListItems((prev) => {
      const items = [...prev];
      items.push(removedItem);
      return items;
    });
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
        <SelectedItems items={selectedItems} onItemClick={removeSelectedItem} />
        <ItemsList items={filteredItems} onItemClick={addSelectedItem} />
      </div>
    </div>
  );
}
