import React, { useEffect, useState } from "react";
import { Comment } from "../../types/types";
import AddComment from "../AddComment/AddComment";
import CommentCard from "../CommentCard/CommentCard";
import './CommentList.css';


interface CommentsProps {
    postId: number
}


export default function CommentList({ postId }: CommentsProps) {
    const [comments, setComments] = useState<Comment[]>([])
    const [openComments, setOpenComments] = useState(false);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
            .then(response => response.json())
            .then(commentsData => setComments(commentsData))
            .catch(error => console.log(error))
    }, [])

    const addComment = (newComment: Comment) => {
        setComments([...comments, newComment])
    }

    return (
        <div className='comment'>
            <div className='container-comm'>
                <a
                    className={openComments ? 'show-comm' : 'noshow-comm'}
                    onClick={() => setOpenComments(!openComments)}>
                    комментарии {comments.length}
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
        </div>
    );
}