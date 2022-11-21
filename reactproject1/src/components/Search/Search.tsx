import React, { useEffect, useState } from 'react';
import styles from  './Search.module.scss';

interface SearchProps {
    setDataPosts: any,
    getPosts: () => void
}



export default function Search({ getPosts, setDataPosts }: SearchProps) {
    const [search, setSearch] = useState('');

    const querySearch = `q=${search}`
    

    useEffect(() => {
        if (search) {
            fetch(`https://jsonplaceholder.typicode.com/posts?${querySearch}`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw response
                })
                .then(searched => setDataPosts(searched))
                .catch(error => console.error("Error fetching data: ", error))
        } else {
            getPosts()
        }
         
             
    }, [search])

    

    return (
        < >
            <input className={styles.search }
                type="search"
                placeholder="поиск..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </>
    );
}