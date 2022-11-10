import React, { useState } from 'react';
import './AddPost.css';


interface AddPostProps {
    dataPosts: any,
    postCount: any,
    setDataPosts: any,
}

export default function AddPost({ dataPosts, postCount, setDataPosts }: AddPostProps) {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    function addPost(title:string, body: string) {
        const newPost = {
            id: +postCount + 1,
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
        setTitle('');
        setBody('');
    }


    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addPost(title, body);
    }


    return (
        <form className='addPost' onSubmit={handleSubmit}>
            <h1 className='head'>добавить пост</h1>
            <label htmlFor='addTitle' />
            <input
                className='addPostInput'
                autoComplete="off"
                id='addTitle'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="Название"
                required />
            <label htmlFor='addBody' />
            <textarea
                id='addBody'
                onChange={(e) => setBody(e.target.value)}
                value={body}
                placeholder="Тело сообщения"
                required />
            <button className='submit-add'>отправить</button>
        </form>
    );
}