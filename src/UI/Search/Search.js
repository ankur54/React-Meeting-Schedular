import classes from './Search.module.css';

import SearchIcon from '@material-ui/icons/Search';
import { useRef } from 'react';

const Search = props => {
    const { onClickHandler } = props
    const searchInput = useRef()

    return (
        <div className={classes['search-bar']}>
            <input 
                ref={searchInput}
                className={classes['search-bar__input']}
                placeholder='Enter the description u want to search for'
            />
            <button 
                onClick={() => onClickHandler(searchInput.current.value)}
                className={classes['search-bar__submit']}
            ><SearchIcon fontSize='small'/>    
            </button>
        </div>
    )
}

export default Search;