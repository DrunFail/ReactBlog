import { useState, useEffect } from 'react';
import './Search.css';

export default function Search({  dataPosts, setSearchResult }) {
    const [search, setSearch] = useState('');

    useEffect(() => {
        !search ? setSearchResult(dataPosts)
            : fetch(`https://jsonplaceholder.typicode.com/posts?q=${search}`)
            .then(response => response.json())
            .then(searched => setSearchResult(searched))
    }, [search, dataPosts])

    

    return (
        < >
            <input className='search'
                type="search"
                placeholder="поиск..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </>
    );
}