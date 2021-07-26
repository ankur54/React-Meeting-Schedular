import classes from './SearchResult.module.css'

const SearchResult = props => {
    const {
        title,
        date,
        startTime,
        endTime
    } = props

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]
    
    return (
        <div className={classes['search-result-container']}>
            <div className={classes['meeting-date']}>
                <h2 className={classes['month-name']}>{ monthNames[new Date(date).getMonth()] }</h2>
                <h3 className={classes['date']}>{ new Date(date).getDate() }</h3>
            </div>
            <div className={classes['meeting-info']}>
                <h3 className={classes['meeting-title']}>{ title }</h3>
                <p className={classes.timing}>{ startTime }  -  { endTime }</p>
            </div>
        </div>
    )
}

export default SearchResult;