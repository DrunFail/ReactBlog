import React, { useState } from 'react';
import { Comment } from '../../interfaces/interfaces';
import styles from './AddComment.module.scss';

interface AddCommentProps {
    addComment: (newComment: Comment) => void,
    postId: number
}


export default function AddComment({ addComment, postId }: AddCommentProps) {
    const [body, setBody] = useState('');
    const email = 'user@mail.ru';
    const newComment: Comment = {
        id: Date.now(),
        email,
        body,
        postId: postId
    }

    return (
        <div className={styles.container }>
            <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Написать комментарий"
            />
            <button
                onClick={() => {
                    addComment(newComment);
                    setBody('');
                }}
                className='addComm'>
                комментировать
            </button>
        </div>
    );
}