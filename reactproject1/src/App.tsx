import React, { useEffect, useState } from 'react';
import './App.css';
import Pagination from './components/Pagination/Pagination';
import AddPost from './components/Posts/AddPost/AddPost';
import PostList from './components/Posts/PostList/PostList';
import Search from './components/Search/Search';
import Modal from './components/ui/modal/Modal';

export default function App() {
    const [dataPosts, setDataPosts] = useState<Post[]>([]);
    const [selectedPage, setSelectedPage] = useState(1)
    const [limitPostOnPage, setLimitPostOnPage] = useState(10)

    const [postCount, setPostCount] = useState(0)

    const getPosts = () => {
        fetch(`https://jsonplaceholder.typicode.com/posts?_page=${selectedPage}&_limit=${limitPostOnPage} `)
            .then(response => {
                setPostCount(response.headers.get('X-Total-Count'));
                return response.json();
            })
            .then(posts => setDataPosts(posts))
            .catch(error => console.log(error))
    }



    useEffect(() => {
       getPosts()
    }, [selectedPage, limitPostOnPage])


    const onPage = (numberPage: number) =>
        setSelectedPage(numberPage)
    

    const getCountPostOnPage = (count: number) => {
        setLimitPostOnPage(count)
    }


   async function addNewPost(title: string, body: string) {

        const newPost = {
            id: Date.now(),
            title,
            body
        }
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(newPost)
        });
        setDataPosts([newPost, ...dataPosts]);
    }




    const deletePost = async (id: number) => {
        const listItems = dataPosts.filter((post) => post.id !== id);
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(listItems)
        });
        setDataPosts(listItems);
    }



    const handleEdit = async (postId: number, editedItem: Post) => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
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

            <Search
                getPosts={getPosts}
                setDataPosts={setDataPosts} />

            <PostList
                handleEdit={handleEdit }
                getCountPostOnPage={getCountPostOnPage}
                deletePost={deletePost}
                dataPosts={dataPosts}
            />
            <Pagination
                limitPostOnPage={limitPostOnPage}
                postCount={postCount}
                selectedPage={selectedPage}
                onPage={onPage }
            />

        </div>

    );
}



