import React, { useEffect, useState } from 'react';
import './Search.css';

interface SearchProps {
    setDataPosts: any,
    getPosts: any
}



export default function Search({ getPosts, setDataPosts }: SearchProps) {
    const [search, setSearch] = useState('');

    const querySearch = `q=${search}`
    

    useEffect(() => {
        if (search !== '') {
            fetch(`https://jsonplaceholder.typicode.com/posts?${querySearch}`)
                .then(response => response.json())
                .then(searched => setDataPosts(searched))
        } else {
            getPosts()
        }
         
             
    }, [search])

    

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