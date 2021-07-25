import classes from './TeamCard.module.css'

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useState } from 'react';

const TeamCard = props => {
    const [showMore, setShowMore] = useState(false)
    const members = [
        { name: 'John Doe', email: 'john.doe@gmail.com' },
        { name: 'John Doe', email: 'john.doe@gmail.com' },
        { name: 'John Doe', email: 'john.doe@gmail.com' },
        { name: 'John Doe', email: 'john.doe@gmail.com' },
        { name: 'John Doe', email: 'john.doe@gmail.com' },
        { name: 'John Doe', email: 'john.doe@gmail.com' },
        { name: 'John Doe', email: 'john.doe@gmail.com' },
        { name: 'John Doe', email: 'john.doe@gmail.com' },
        { name: 'John Doe', email: 'john.doe@gmail.com' },
    ];

    const showMembers = members.slice(0, 3).map((member, i) => (
        <div 
            key={i}
            className={`${classes['team-member']} ${classes.show}`}
        >{member.name}
        </div>
    ))

    const hideMembers = showMore && (
        members.slice(3).map((member, i) => (
            <div 
                key={i}
                className={`${classes['team-member']} ${showMore && classes.show}`}
            >{member.name}
            </div>
        ))
    )
    
    const onClickHandler = () => {
        setShowMore(true) 
    }

    const rem = (members.length > 3) && (
        <div 
            style={{ display: showMore ? 'none' : 'inline-block' }}
            className={classes.rem}
            onClick={onClickHandler}
        >{members.length - 3}+
        </div>
    )
    return (
        <div className={classes['team-card']}>
            <h2 className={classes['team-card__title']}>
                The Cyclists
            </h2>
            <p className={classes['team-card__description']}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, provident.
            </p>
            <div className={classes['team-card__btn']}>
                <button className={classes['add-team-member']}>
                    <PersonAddIcon />
                </button>
                <button className={classes['remove-team-member']}>
                    Excuse Yourself
                </button>
            </div>
            <div className={classes['team-members']}>
                {showMembers}
                {hideMembers}
                {rem}
            </div>
        </div>
    )
}

export default TeamCard