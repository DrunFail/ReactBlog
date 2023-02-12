import React, { useState } from 'react';
import store from '../../../store';
import { Post } from '../../interfaces/interfaces';
import styles from './EditPost.module.scss';


interface EditPostProps {
    post: Post,
    closeEditForm: () => void
}

export default function EditPost({ post, closeEditForm}: EditPostProps) {
    const [editTitle, setEditTitle] = useState(post.title)
    const [editBody, setEditBody] = useState(post.body)
        
    const editedItem: Post = { id: post.id, title: editTitle, body: editBody }
    
    return (
        <>
            <form
                className={styles.editForm}
                onSubmit={(e) => {
                    e.preventDefault()
                    store.editPost(editedItem)
                    closeEditForm()
                }
                }
            >
                <h1>форма редактирования</h1>
                <input className={styles.editTitle }
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="edit title"
                />
                <textarea className={styles.editBody }
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                    placeholder="edit body"
                />
                <button
                    className={styles.button }>
                    Сохранить</button>
            </form>
        </>
    );
}