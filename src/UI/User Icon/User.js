import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Person } from '@material-ui/icons'

import classes from './User.module.css'
import { authActions } from '../../store/AuthStore'

const UserAccount = props => {
    const {
        name,
        email
    } = props.userDetails

    const [clicked, setClicked] = useState(false)
    const dispatch = useDispatch()

    const onClickHandler = () => {
        setClicked(prev => !prev)
    }

    const onLogoutHandler = () => {
        dispatch(authActions.logout())
    }

    return (
        <div
            className={classes['user']}
            onClick={onClickHandler}
        >
            <Person/>
            <div className={`${classes['user-context-menu']} ${clicked && classes.show}`}>
                <div className={classes['context-menu__item']}>
                    { name }
                </div>
                <div className={classes['context-menu__item']}>
                    { email }
                </div>
                <button 
                    className={`${classes['logout']}
                                ${classes['context-menu__item']}`}
                    onClick={onLogoutHandler}
                >Logout
                </button>
            </div>
        </div>
    )
}

export default UserAccount