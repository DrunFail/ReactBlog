import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import deleteImg from '../../../assets/delete.png';
import editImg from '../../../assets/edit.png';
import store from '../../../store';
import CommentList from '../../Comments/CommentList/CommentLIst';
import { Post } from '../../interfaces/interfaces';
import EditPost from '../EditPost/EditPost';
import styles from './PostCard.module.scss';


interface PostCardProps {
    post: Post,
}


const  PostCard = observer(({ post }: PostCardProps) => {
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
                        src={deleteImg}
                        onClick={() => store.removePost(post.id) }                    />
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
                        post={post}
                        closeEditForm={closeEditForm }
                    />
                </div>


            }
        </article>

    );
})

export default PostCard;