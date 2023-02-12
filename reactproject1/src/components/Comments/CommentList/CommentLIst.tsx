import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Comment } from "../../interfaces/interfaces";
import AddComment from "../AddComment/AddComment";
import CommentCard from "../CommentCard/CommentCard";
import styles from './CommentList.module.scss';


interface CommentsProps {
    postId: number
}


const CommentList = observer(({ postId }: CommentsProps) => {
    const [comments, setComments] = useState<Comment[]>([])
    const [openComments, setOpenComments] = useState(false);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
            .then(response => response.json())
        .then(comments => setComments(comments))
    }, [])

    const addComment = (newComment: Comment) => {
        setComments([...comments, newComment])
    }

    return (
        <div className={styles.container }>
                <a
                    className={openComments ? 'show-comm' : 'noshow-comm'}
                    onClick={() => setOpenComments(!openComments)}>
                <span>комментарии </span>({comments.length})
                </a>
                {openComments &&
                    <>
                        <AddComment
                            addComment={addComment}
                            postId={postId}
                        />
                        {comments.map(comment =>
                            <CommentCard
                                key={comment.id}
                                comment={comment} />
                        )}
                    </>
                }
            </div>
    );
}
)

export default CommentList;