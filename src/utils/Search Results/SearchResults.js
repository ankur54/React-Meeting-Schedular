import classes from './SearchResults.module.css'
import SearchView from './Search View/SearchView'
import SearchResult from './Search Result/SearchResult'

const SearchResults = props => {
    const { searchResults } = props

    const searchResultsList = searchResults.map(result => {
        return (
            <SearchResult
                key={result._id}
                title={result.title}
                date={result.date}
                startTime={result.startTime}
                endTime={result.endTime}
            />
        )
    })

    return (
        <div className={classes['search-results']}>
            <div className={classes['search-list']}>
                { searchResultsList }
            </div>
            <SearchView/>
        </div>
    )
}

export default SearchResults