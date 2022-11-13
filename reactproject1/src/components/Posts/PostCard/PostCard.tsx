import React, { useState } from 'react';
import deleteImg from '../../../assets/delete.png';
import editImg from '../../../assets/edit.png';
import CommentList from '../../Comments/CommentList/CommentLIst';
import { Post } from '../../types/types';
import EditPost from '../EditPost/EditPost';
import styles from './PostCard.module.scss';


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
        <article
            className={styles.container}
            key={post.id}>
            {!editOpen &&
                <>
                    <h1 className={styles.postTitle}>{post.title}</h1>
                    <p className={styles.postBody}>{post.body}</p>

                    <div className={styles.buttons}>
                        <img
                            onClick={() => deletePost(post.id)}
                            src={deleteImg} />
                        <img
                            onClick={() => setEditOpen(!editOpen)}
                            src={editImg} />
                    </div>
                    <div className={styles.comments}>
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
                        closeEditForm={closeEditForm}
                    />
                </div>


            }
        </article>

    );
}