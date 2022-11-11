import React, { useEffect, useState } from 'react';
import './App.css';
import AddPost from './components/Posts/AddPost/AddPost';
import PostItem from './components/Posts/PostItem/PostItem';
import Modal from './components/ui/modal/Modal';

function App() {
    const [dataPosts, setDataPosts] = useState<Post[]>([]);
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


    function addNewPost(title: string, body: string) {

        const newPost = {
            id: Date.now(),
            title,
            body
        }
        const response = fetch(`https://jsonplaceholder.typicode.com/posts/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(newPost)
        });
        setDataPosts([newPost, ...dataPosts]);
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

    const checkPost = (id: number) => {
        const x = dataPosts.find(post => post.id === id)
    }


    const handleEdit = (postId: number, editedItem: any) => {
        const response = fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(editedItem)
        });
        setDataPosts(dataPosts.map((post) => post.id === postId ? { ...editedItem } : post))

    }

    return (
        <div className="App">
            <Modal>
                <AddPost
                    addNewPost={addNewPost}
                />
            </Modal>
            <PostItem
                handleEdit={handleEdit }
                getCountPostOnPage={getCountPostOnPage}
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

