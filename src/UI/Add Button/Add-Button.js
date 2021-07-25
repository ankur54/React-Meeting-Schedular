import { useState } from 'react';

import classes from './Add-Button.module.css'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';

const AddButton = ({ onAddMeetingClick }) => {
    const [clicked, setClicked] = useState(false);
    const clickHandler = () => {
        setClicked(click => click = !click)
        onAddMeetingClick()
    }

    return ( 
        <AddCircleRoundedIcon 
            className={`${classes['add-meeting']} ${clicked ? classes.active : ''}`}
            onClick={clickHandler}
        />
    )
}

export default AddButton;