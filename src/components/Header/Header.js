import classes from './Header.module.css';
import Search from '../../UI/Search/Search';
import AddButton from '../../UI/Add Button/Add-Button';

const Header = ({ onAddMeetingClick }) => {
    return (
        <header>
            <AddButton onAddMeetingClick={onAddMeetingClick}/>
            <nav>
                <a href="meetings.html" className={classes["active"]}>Meeting</a>
                <a href="teams.html">Teams</a>
            </nav>
            <Search />
        </header>
    )
}

export default Header;