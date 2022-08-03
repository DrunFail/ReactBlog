import { useState } from 'react';
import './EditPost.css';
import editImg from '../../../assets/edit.png';


export default function EditPost({   post, dataPosts, setDataPosts   }) {
    const [editTitle, setEditTitle] = useState('')
    const [editBody, setEditBody] = useState('')
    const [editModal, setEditModal] = useState(false)

    
    const editPost = (id) => {
        setEditModal(true)
        const editItems = dataPosts.find((post) => post.id == id);
        setEditBody(editItems.body)
        setEditTitle(editItems.title)
        
    }
    const handleEdit = (id) => {
        setEditModal(false)
        const editItem = { id, title: editTitle, body: editBody }
        console.log(id)
        const response = fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(editItem)
        });
        setDataPosts(dataPosts.map((post) => post.id === id ? { ...editItem } : post))
        setEditBody('')
        setEditTitle('')
    }
    

    return (
        <>
            <img  onClick={() => editPost(post.id)} className='editImg' src={editImg} />

            <form className={editModal ? 'form-editopen' : 'form-edit' } onSubmit={(e) => e.preventDefault()}>

                <input className='edit-title'
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="edit title"
                />
                <input className='edit-body'
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                    placeholder="edit body"
                />
                <button onClick={() => handleEdit(post.id) }>save</button>
            </form>
        </>
    );
}