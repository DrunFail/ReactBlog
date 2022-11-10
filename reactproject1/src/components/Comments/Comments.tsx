import React, { useEffect, useState } from "react";
import './Comments.css';

interface Comment {
    body: string,
    email: string,
    id: number,
    postId: number
}


interface CommentsProps {
    postId: number
}


export default function Comments({ postId }: CommentsProps) {

    const [comments, setComments] = useState<Comment[]>([])
    const [openComments, setOpenComments] = useState(false);
    const email = 'user@mail.ru';
    const [body, setBody] = useState('');

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
            .then(response => response.json())
            .then(commentsData => setComments(commentsData))
            .catch(error => console.log(error))
    }, [])

    const addComment = () => {
        const newComment: Comment = {
            id: Date.now(),
            email,
            body,
            postId: postId
        }
        setComments([...comments, newComment])
        setBody('')
    }

    return (
        <div className='comment'>
            <div className='container-comm'>
                <a className={openComments ? 'show-comm' : 'noshow-comm'} onClick={() => setOpenComments(!openComments)}>комментарии {comments.length }</a>
                {comments.map((comment) =>
                    <div className={openComments ? 'container-commentar' : 'container-commentarclose'} key={comment.id}>
                        <h5 className='author'>{comment.email}</h5>
                        <p className='body-comm'>{comment.body}</p>
                    </div>
                )}
                <div className={openComments ? 'show-add' : 'noshow-add'}>
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value) }
                    />
                    <button onClick={() => addComment()}  className='addComm'>комментировать</button>
                </div>
            </div>

        </div>
    );
}