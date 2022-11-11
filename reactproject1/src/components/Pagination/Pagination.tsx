import React from 'react';

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

    const pagesArray = Array(pageCount).fill().map((_, index) => index + 1)

    return (
        <div className="button-container">
            <button
                onClick={() => onPage(selectedPage - 1)}
                disabled={selectedPage === 1}
            >
                prev
            </button>

            {pagesArray.map(page =>
                <button
                    key={page}
                    onClick={() => onPage(page)}>
                    {page}
                </button>)}
            <button
                onClick={() => onPage(selectedPage + 1)}
                disabled={selectedPage === pageCount}
            >
                next
            </button>
        </div>


    );
}