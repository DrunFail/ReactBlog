import React from 'react';
import styles from  './Search.module.scss';

interface SearchProps {
    search: string,
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}


export default function Search({search, handleSearch  }: SearchProps) {

    return (
        < >
            <input className={styles.search }
                type="search"
                placeholder="поиск..."
                value={search}
                onChange={handleSearch}
            />
        </>
    );
}