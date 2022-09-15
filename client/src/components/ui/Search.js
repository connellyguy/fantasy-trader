import { useEffect, useState } from 'react';
import useDebounce from 'utils/use-debounce';
import classes from './Search.module.scss';
import FeatherIcon from 'feather-icons-react';

function Search(props) {
    let { onSearch, debounce, placeholder } = props;
    placeholder = placeholder || 'Search...';

    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, debounce);

    useEffect(() => {
        onSearch(debouncedSearchTerm);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchTerm]);

    return (
        <div className={classes.searchContainer}>
            <div className={classes.searchIcon}>
                <FeatherIcon icon="search" size={18} />
            </div>
            <input
                id="search"
                type="search"
                className={classes.search}
                placeholder={placeholder}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
}

export default Search;
