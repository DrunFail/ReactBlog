import React from 'react';
import { Comment } from '../../types/types';


interface CommentCardProps {
    comment: Comment
}

export default function CommentCard({ comment }: CommentCardProps) {
    return (
        <div >
            <h5 className='author'>{comment.email}</h5>
            <p className='body-comm'>{comment.body}</p>
        </div>
        
        );
}