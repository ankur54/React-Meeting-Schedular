import classes from './Header.module.css';
import Search from '../../UI/Search/Search';
import AddButton from '../../UI/Add Button/Add-Button';
import { SearchRounded } from '@material-ui/icons';

import { useState } from 'react';

const Header = props => {
    const { 
        addClicked,
        searchClickedHandler,
        onClickHandler, 
        onChangeTab, 
        currTab 
    } = props

    const tabChangeHandler = tabName => {
        onChangeTab(tabName)
    }

    return (
        <header>
            <AddButton 
                clicked={addClicked}
                onClick={onClickHandler}
            />
            <nav>
                <div 
                    className={`${classes.tab} ${(currTab === 'meeting') && classes['active']}`}
                    onClick={tabChangeHandler.bind(this, 'meeting')}
                >Meeting
                </div>
                <div 
                    className={`${classes.tab} ${(currTab === 'team') && classes['active']}`}
                    onClick={tabChangeHandler.bind(this, 'team')}
                >Teams
                </div>
            </nav>
            <button 
                className={classes['search-btn']}
                onClick={searchClickedHandler}
            ><SearchRounded fontSize='small'/>
            </button>
        </header>
    )
}

export default Header;