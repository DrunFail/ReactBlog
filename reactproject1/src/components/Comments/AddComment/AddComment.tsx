import React, { useState } from 'react';
import { Comment } from '../../types/types';

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
        <div className='show-add'>
            <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
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