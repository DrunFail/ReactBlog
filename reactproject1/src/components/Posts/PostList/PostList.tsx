import React from 'react';
import styles from './PostList.module.scss';
import PostCard from '../PostCard/PostCard';
import { Post } from '../../interfaces/interfaces';



interface PostListProps {
    deletePost: (id: number) => Promise<void>,
    getCountPostOnPage: (count: number) => void,
    dataPosts: Post[],
    handleEdit: (postId: number, editedItem: Post) => Promise<void>
}



export default function PostList({ deletePost, handleEdit, getCountPostOnPage, dataPosts }: PostListProps) {
    const options = [{ value: 10, label: 10 },
    { value: 20, label: 20 },
    { value: 100, label: 'все' }]





    return (
        <div className={styles.container }>
                <h1>список постов</h1>
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
            <div className={styles.postList}>

            
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

                    
        </div>
    );
}