import { Person } from "@material-ui/icons";
import classes from "./SelectedItem.module.css";

const SelectedItem = (props) => {
  const { item, onItemClick } = props;
  return (
    <div
      key={item._id}
      className={classes["selected-item"]}
      onClick={onItemClick}
    >
      <Person style={{
        padding: '0.1em',
        fontSize: '2em',
        borderRadius: '100%',
        border: '1px solid white'
      }} />
      <div className={classes["selected-item__name"]}>{item.name}</div>
    </div>
  );
};

export default SelectedItem;
