import { useEffect, useState } from "react";
import './Comments.css';

export default function Comments({ post }) {
    const [comments, setComments] = useState([])
    const [openComments, setOpenComments] = useState(false);
    const email = 'user@mail.ru';
    const [body, setBody] = useState('');

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
            .then(response => response.json())
            .then(commentss => setComments(commentss))
            .catch(error => console.log(error))
    }, [])

    const addComment = () => {
        const newComment = {
            email,
            body
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