import React from 'react';
import './PostList.css';
import PostCard from '../PostCard/PostCard';



interface PostItemProps {
    deletePost: (id: number) => void,
    getCountPostOnPage: (count: number) => void,
    dataPosts: Post[],
    handleEdit: (postId: number, editedItem: Post) => void
}



export default function PostItem({ deletePost, handleEdit, getCountPostOnPage, dataPosts }: PostItemProps) {
    const options = [{ value: 10, label: 10 },
    { value: 20, label: 20 },
    { value: 100, label: 'все' }]





    return (
        <>
            <div className='post-container'>
                <h1>список постов</h1>
            </div>
            <div>
                <p>show posts:</p>
                <p><select onChange={(e) => getCountPostOnPage(+e.target.value)}>
                    {options.map((option) =>
                        <option
                            value={option.value}
                            key={option.value}>
                            {option.label}
                        </option>)}
                </select></p>
            </div>
            <div className='postsList'>

            
            {!dataPosts.length ? <p>no posts</p>
                : dataPosts.map(post =>
                    <PostCard
                        key={post.id}
                        deletePost={deletePost}
                        post={post}
                        handleEdit={handleEdit }
                    />)
                }

            </div>

                    
        </>
    );
}