import SelectedItem from "./SelectedItem/SelectedItem";
import classes from "./SelectedItems.module.css";

const SelectedItems = (props) => {
  const { items, onItemClick } = props;
  const selectedItems = items.map((item, idx) =>
    <SelectedItem item={item} onItemClick={onItemClick.bind(this, idx)} />
  );
  return <div className={classes["selected-items"]}>{selectedItems}</div>;
};

export default SelectedItems;
