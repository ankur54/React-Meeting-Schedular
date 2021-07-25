import classes from './Search.module.css';

import SearchIcon from '@material-ui/icons/Search';

const Search = () => {
    return (
        <div className={classes["search-bar"]}>
            <input type="text" className={classes["search-bar__input"]} placeholder="Enter meeting description" name="search-input" id="" />
            <button className={classes["search-bar__submit"]}>
                <SearchIcon fontSize='small'/>    
            </button>
        </div>
    )
}

export default Search;