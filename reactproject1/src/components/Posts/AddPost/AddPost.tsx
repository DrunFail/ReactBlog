import React, { useState } from 'react';
import './AddPost.css';


interface AddPostProps {
    addNewPost: (title: string, body: string) => void
}

export default function AddPost({ addNewPost }: AddPostProps) {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')


    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addNewPost(title, body);
        setTitle('');
        setBody('');
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