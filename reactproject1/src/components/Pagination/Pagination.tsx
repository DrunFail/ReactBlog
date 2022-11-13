import React from 'react';
import styles from './Pagination.module.scss';

interface PaginationProps {
    selectedPage: number,
    limitPostOnPage: number,
    postCount: number,
    onPage: (numberPage: number) => void
}


export default function Pagination({ selectedPage,
                                     limitPostOnPage,
                                      postCount,
                                      onPage }: PaginationProps) {

    const pageCount = Math.ceil(postCount / limitPostOnPage)

    const pagesArray = Array.from({ length: pageCount }, (_, i) => i + 1)

    return (
        <div className={styles.container}>
            <button
                onClick={() => onPage(selectedPage - 1)}
                disabled={selectedPage === 1}
            >
                Пред.
            </button>

            {pagesArray.map(page => {
                const aria = (selectedPage === page) ? "page" : undefined
                    return(
                <button
                            key={page}
                            onClick={() => onPage(page)}
                            aria-current={aria }>
                    {page}
                </button>
            )})}
            <button
                onClick={() => onPage(selectedPage + 1)}
                disabled={selectedPage === pageCount}
            >
                След.
            </button>
        </div>


    );
}