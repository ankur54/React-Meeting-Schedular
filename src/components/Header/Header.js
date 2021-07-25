import classes from './Header.module.css';
import Search from '../../UI/Search/Search';
import AddButton from '../../UI/Add Button/Add-Button';
import { useState } from 'react';

const Header = props => {
    const { 
        clicked,
        onClickHandler, 
        onChangeTab, 
        currTab 
    } = props
    
    const meetingSearch = <Search />

    const tabChangeHandler = tabName => {
        onChangeTab(tabName)
    }

    return (
        <header>
            <AddButton 
                clicked={clicked}
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
            { meetingSearch }
        </header>
    )
}

export default Header;