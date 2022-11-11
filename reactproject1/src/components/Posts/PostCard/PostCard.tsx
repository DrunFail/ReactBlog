import React, { useState } from 'react';
import deleteImg from '../../../assets/delete.png';
import editImg from '../../../assets/edit.png';
import CommentList from '../../Comments/CommentList/CommentLIst';
import { Post } from '../../types/types';
import EditPost from '../EditPost/EditPost';
import './PostCard.css';


interface PostCardProps {
    post: Post,
    deletePost: (id: number) => void,
    handleEdit: (postId: number, editedItem: Post) => void
}


export default function PostCard({ post, deletePost, handleEdit }: PostCardProps) {
    const [editOpen, setEditOpen] = useState(false)

    const closeEditForm = () => {
        setEditOpen(false)
    }

    return (
        <article className="post-item" key={post.id}>
            {!editOpen &&

                <>
                    <h1 className='title'>{post.title}</h1>
                    <p className='body'>{post.body}</p>

                    <div className='groupButton'>
                        <img onClick={() => deletePost(post.id)} className='deleteImg' src={deleteImg} />
                        <img onClick={() => setEditOpen(!editOpen)} className='editImg' src={editImg} />
                    </div>
                    <div className='commentsContainer'>
                        <CommentList
                            postId={post.id}
                        />
                    </div>
                </>
            }

            {editOpen &&
                <div className='editPost'>
                    <EditPost
                        handleEdit={handleEdit}
                        post={post}
                        closeEditForm={closeEditForm }
                    />
                </div>


            }
        </article>

    );
}