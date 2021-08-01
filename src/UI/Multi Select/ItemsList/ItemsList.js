import classes from "./ItemsList.module.css";
import ListItem from "./ListItem/ListItem";

const ItemsList = (props) => {
  const { items, onItemClick } = props;

  const itemsList = items.map((item, idx) => (
    <ListItem item={item} onItemClick={onItemClick.bind(this, idx)} />
  ));

  return <div className={classes["items-list"]}>{itemsList}</div>;
};

export default ItemsList;
