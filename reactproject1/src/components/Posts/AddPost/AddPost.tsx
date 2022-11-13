import React, { useState } from 'react';
import styles from './AddPost.module.scss';


interface AddPostProps {
    addNewPost: (title: string, body: string) => void
}

export default function AddPost({ addNewPost }: AddPostProps) {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addNewPost(title, body);
        setTitle('');
        setBody('');
    }


    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h1>добавить пост</h1>
            <div className={styles.addTitle}>
                <label htmlFor='addTitle' >Название</label>
                <input
                    className='addPostInput'
                    autoComplete="off"
                    id='addTitle'
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    placeholder="Название"
                    required />

            </div>
            <div className={styles.addBody}>
                <label htmlFor='addBody'>Тело сообщения</label>
                <textarea
                    id='addBody'
                    onChange={(e) => setBody(e.target.value)}
                    value={body}
                    placeholder="Тело сообщения"
                    required />

            </div>
            <button className='submit-add'>отправить</button>
        </form>
    );
}