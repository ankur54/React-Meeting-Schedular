import classes from './Search.module.css';

import SearchIcon from '@material-ui/icons/Search';
import { Fragment } from 'react';

const Search = props => {
    const { onClickHandler } = props
    return (
        <div className={classes['search-bar']}>
            <input 
                className={classes['search-bar__input']}
                placeholder='Enter the meeting description'
            />
            <button 
                onClick={onClickHandler}
                className={classes['search-bar__submit']}
            ><SearchIcon fontSize='small'/>    
            </button>
        </div>
    )
}

export default Search;