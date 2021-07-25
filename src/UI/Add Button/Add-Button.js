import { useState } from 'react';

import classes from './Add-Button.module.css'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';

const AddButton = props => {
    const { clicked, onClick } = props
    const onClickHandler = () => {
        onClick()
    }

    return ( 
        <AddCircleRoundedIcon 
            className={`${classes['add-meeting']} ${clicked ? classes.active : ''}`}
            onClick={onClickHandler}
        />
    )
}

export default AddButton;