import React, { useState } from 'react';
import './EditPost.css';


interface EditPostProps {
    post: Post,
    handleEdit: (postId: number, editedItem: Post) => void,
    closeEditForm: () => void
}

export default function EditPost({ post, handleEdit,closeEditForm }: EditPostProps) {
    const [editTitle, setEditTitle] = useState(post.title)
    const [editBody, setEditBody] = useState(post.body)
        
    const editedItem: Post = { id: post.id, title: editTitle, body: editBody }
    
    return (
        <>
            <form  className='editForm'   onSubmit={(e) => e.preventDefault()}>
                <h1>форма редактирования</h1>
                <input className='edit-title'
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="edit title"
                />
                <textarea className='edit-body'
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                    placeholder="edit body"
                />
                <button
                    className='button'
                    onClick={() => {
                        handleEdit(post.id, editedItem);
                        closeEditForm()
                    }
                    }>Сохранить</button>
            </form>
        </>
    );
}