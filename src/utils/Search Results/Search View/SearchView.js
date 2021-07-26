import classes from './SearchView.module.css'

const SearchView = props => {
    const {
        title,
        description,
        date,
        startTime,
        endTime,
        organizer,
        attendees
    } = props

    return (
        <div className={classes['search-view']}></div>
    )
}

export default SearchView