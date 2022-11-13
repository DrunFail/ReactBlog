import React from 'react';
import { Comment } from '../../types/types';
import styles from './CommentCard.module.scss';


interface CommentCardProps {
    comment: Comment
}

export default function CommentCard({ comment }: CommentCardProps) {
    return (
        <div className={styles.container}>

            <h5 className={styles.author}>
                {comment.email}
            </h5>

            <p className={styles.body}>
                {comment.body}
            </p>

        </div>
    );
}