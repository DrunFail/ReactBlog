import React from 'react';
import deleteImg from '../../../assets/delete.png';
import Comments from '../../Comments/Comments';
import Search from '../../Search/Search';
import EditPost from '../EditPost/EditPost';
import './PostItem.css';


interface PostItemProps {
    deletePost: (id: number) => void,
    getCountPostOnPage: (count: number) => void,
    setSearchResult: any,
    searchResult: any,
    dataPosts: any,
    setDataPosts: any
}



export default function PostItem({ deletePost, getCountPostOnPage, setSearchResult, searchResult, dataPosts, setDataPosts }: PostItemProps) {
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
                />
            </div>
            <div>
                <p>show posts:</p>
                <p><select onChange={(e) => getCountPostOnPage(+e.target.value)}>
                    {options.map((option) => <option value={option.value } key={option.value}>{option.label}</option>)}
                </select></p>
                </div>
            {!searchResult.length ? <p>no posts</p>
                : searchResult.map((post) =>
                    <article className="post-item" key={post.id}>
                        <h1 className='title'>{post.title}</h1>
                        <p className='body'>{post.body}</p>
                        <Comments
                            postId={post.id}
                        />
                        <img onClick={() => deletePost(post.id)} className='deleteImg' src={deleteImg} />
                        <EditPost
                            post={post}
                            dataPosts={dataPosts}
                            setDataPosts={setDataPosts}
                        />
                    </article>)}
        </>
    );
}