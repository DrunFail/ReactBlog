import React, { useEffect, useState } from 'react';
import './App.css';
import PostItem from './components/Posts/PostItem/PostItem';
import Modal from './components/ui/modal/Modal';

function App() {
    const [dataPosts, setDataPosts] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [postCount, setPostCount] = useState(null)
    const pageCount = Math.ceil(postCount / limit)
    const pagesArray = Array(pageCount).fill().map((_, index) => index + 1)

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit} `)
            .then(response => {
                setPostCount(response.headers.get('X-Total-Count'));
                return response.json();
            })
            .then(posts => setDataPosts(posts))
            .catch(error => console.log(error))
    }, [page, limit])

    function prevPage() {
        setPage(page - 1)
    }
    function nextPage() {
        setPage(page + 1)
    }

    const getCountPostOnPage = (count: number) => {
        setLimit(count)
    }


    const deletePost = (id: number) => {
        const listItems = dataPosts.filter((post) => post.id !== id);
        const response = fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(listItems)
        });
        setDataPosts(listItems);
    }

    return (
        <div className="App">
            <Modal
                postCount={postCount}
                dataPosts={dataPosts}
                setDataPosts={setDataPosts} />
            <PostItem
                getCountPostOnPage={getCountPostOnPage }
                searchResult={searchResult}
                deletePost={deletePost}
                dataPosts={dataPosts}
                setDataPosts={setDataPosts}
                setSearchResult={setSearchResult}
            />
            <div className="button-container">
                <button
                    onClick={prevPage}
                    disabled={page === 1}
                >
                    prev
                </button>
                <button
                    onClick={nextPage}
                    disabled={!dataPosts.length}
                >
                    next
                </button>
                {pagesArray.map((el) => <button key={el} onClick={() => setPage(el)}>{el}</button>)}
            </div>
        </div>

    );
}

export default App;

