import React, { useEffect } from 'react';
import styles from './PostList.module.scss';
import PostCard from '../PostCard/PostCard';
import { Post } from '../../interfaces/interfaces';
import { observer } from 'mobx-react-lite';
import store from '../../../store';



interface PostListProps {
    posts: Post[],
    selectedPage: number,
    limitPostOnPage: number,
    getCountPostOnPage: (count: number) => void,
    search: string
}



const PostList = observer(({ posts, selectedPage, limitPostOnPage, getCountPostOnPage, search }: PostListProps) =>  {
    const options = [{ value: 10, label: 10 },
    { value: 20, label: 20 },
    { value: 100, label: 'все' }]

    useEffect(() => {
        store.fetchPosts(selectedPage, limitPostOnPage, search)
    }, [selectedPage, limitPostOnPage, search])




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

            
            {!posts.length ? <p>no posts</p>
                : posts.map(post =>
                    <PostCard
                        key={post.id}
                        post={post}
                    />)
                }

            </div>

                    
        </div>
    );
})


export default PostList;