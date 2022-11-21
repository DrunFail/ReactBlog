import React, { useEffect, useState } from 'react';
import styles from './App.module.scss';
import Pagination from './components/Pagination/Pagination';
import AddPost from './components/Posts/AddPost/AddPost';
import PostList from './components/Posts/PostList/PostList';
import Search from './components/Search/Search';
import { Post } from './components/types/types';
import Modal from './components/ui/modal/Modal';

export default function App() {
    const [dataPosts, setDataPosts] = useState<Post[]>([]);
    const [selectedPage, setSelectedPage] = useState(1)
    const [limitPostOnPage, setLimitPostOnPage] = useState(10)

    const [postCount, setPostCount] = useState(0)

    const controller = new AbortController();
    const signal = controller.signal;

    const getPosts = (): void => {
        fetch(`https://jsonplaceholder.typicode.com/posts?_page=${selectedPage}&_limit=${limitPostOnPage} `, {signal})
            .then(response => {
                if (response.ok) {
                    setPostCount(Number(response.headers.get('X-Total-Count')));
                    return response.json();
                }
                throw response
            })
            .then(posts => setDataPosts(posts))
            .catch(error => {
                if (error.name === 'AbortError') {
                    console.log('cancelled')
                } else {
                    console.error("Error fetching data: ", error)
                }
            })
    }

    useEffect(() => {
        getPosts();

        return () => {
            controller.abort();
        };
    }, [selectedPage, limitPostOnPage]);


    const onPage = (numberPage: number): void =>
        setSelectedPage(numberPage)


    const getCountPostOnPage = (count: number): void => {
        setLimitPostOnPage(count)
    }


    async function addNewPost(title: string, body: string): Promise<void> {

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
        if (!response.ok) {
            const message = `Error has occured: ${response.status}`;
            throw new Error(message)
        }
        setDataPosts([newPost, ...dataPosts]);
    }




    const deletePost = async (id: number): Promise<void> => {
        const listItems = dataPosts.filter((post) => post.id !== id);
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(listItems)
        });
        if (!response.ok) {
            const message = `Error has occured: ${response.status}`
            throw new Error(message)
        }
        setDataPosts(listItems);
    }



    const handleEdit = async (postId: number, editedItem: Post): Promise<void> => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(editedItem)
        });
        if (!response.ok) {
            const message = `Error has occured: ${response.status}`
            throw new Error(message)
        }
        setDataPosts(dataPosts.map((post) => post.id === postId ? { ...editedItem } : post))

    }

    return (
        <div className={styles.App}>
            <Modal>
                <AddPost
                    addNewPost={addNewPost}
                />
            </Modal>

            <Search
                getPosts={getPosts}
                setDataPosts={setDataPosts} />

            <PostList
                handleEdit={handleEdit}
                getCountPostOnPage={getCountPostOnPage}
                deletePost={deletePost}
                dataPosts={dataPosts}
            />
            <Pagination
                limitPostOnPage={limitPostOnPage}
                postCount={postCount}
                selectedPage={selectedPage}
                onPage={onPage}
            />

        </div>

    );
}



