import classes from "./ListItem.module.css";
import { Person } from "@material-ui/icons";

const ListItem = (props) => {
  const { item, onItemClick } = props;

  return (
    <div
      key={item._id}
      className={classes["list-item"]}
      onClick={onItemClick}
    >
      <div className={classes["list-item__name"]}>
        <Person style={{
          padding: '0.1em',
          fontSize: '2.5em',
          borderRadius: '100%',
          backgroundColor: '#cdcdcd'
        }} />
        {item.name}
      </div>
      <div className={"list-item__email"}>{item.email}</div>
    </div>
  );
};

export default ListItem;
