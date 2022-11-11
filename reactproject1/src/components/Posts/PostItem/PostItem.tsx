import React from 'react';
import Search from '../../Search/Search';
import './PostItem.css';
import PostCard from '../PostCard/PostCard';



interface PostItemProps {
    deletePost: (id: number) => void,
    getCountPostOnPage: (count: number) => void,
    setSearchResult: any,
    searchResult: any,
    dataPosts: any,
    setDataPosts: any,
    handleEdit: any
    
}



export default function PostItem({ deletePost, handleEdit, getCountPostOnPage, setSearchResult, searchResult, dataPosts, setDataPosts }: PostItemProps) {
    const options = [{ value: 10, label: 10 },
    { value: 20, label: 20 },
    { value: 100, label: 'все' }]





    return (
        <>
            <div className='post-container'>
                <h1>список постов</h1>
                <Search
                    dataPosts={dataPosts}
                    setSearchResult={setSearchResult}
                    setDataPosts={setDataPosts }
                />
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

            
            {!searchResult.length ? <p>no posts</p>
                : searchResult.map(post =>
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