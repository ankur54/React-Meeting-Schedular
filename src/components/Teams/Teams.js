import classes from './Teams.module.css'

import TeamCard from './Team Card/TeamCard'
import Modal from '../../UI/Modal Container/Modal'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Fragment, useState } from 'react'

const Teams = props => {
    const { showModal, onToggleModal } = props
    
    return (
        <Fragment>
            <Modal 
                showModal={showModal}
                onToggleModal={onToggleModal}
            >
                <form action="" method="post" className={classes['create-team']}>
                    <input type="text" name="team-title" id={classes['create-team-title']} required placeholder="Enter team title" />
                    <textarea name="team-description" id={classes['create-team-description']} cols="30" rows="1" placeholder="What the team is about?"></textarea>
                    <select name="select-team-member" id={classes['select-team-member']}>
                        <option>Choose an Attendee</option>
                        <option value="user.name@mail.domain">Attendee 1</option>
                        <option value="user.name@mail.domain">Attendee 2</option>
                        <option value="user.name@mail.domain">Attendee 3</option>
                        <option value="user.name@mail.domain">Attendee 4</option>
                        <option value="user.name@mail.domain">Attendee 5</option>
                        <option value="user.name@mail.domain">Attendee 6</option>
                        <option value="user.name@mail.domain">Attendee 7</option>
                        <option value="user.name@mail.domain">Attendee 8</option>
                        <option value="user.name@mail.domain">Attendee 9</option>
                        <option value="user.name@mail.domain">Attendee 10</option>
                    </select>
                    <button className={classes['create-team']}>
                        <PersonAddIcon fontSize='small'/>
                        Create Team
                    </button>
                </form>
            </Modal>
            <div className={classes['teams-list']}>
                <TeamCard/>
            </div>
        </Fragment>
    )
}

export default Teams