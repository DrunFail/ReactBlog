import Comments from '../../Comments/Comments';
import EditPost from '../EditPost/EditPost';
import './PostItem.css';
import deleteImg from '../../../assets/delete.png';
import Search from '../../Search/Search';

export default function PostItem({ deletePost, setLimit, setSearchResult, searchResult, dataPosts, setDataPosts }) {
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
                <p><select onChange={(e) => setLimit(options.find((elem) => elem.label == e.target.value).value)}>
                    {options.map((option) => <option key={option.value}>{option.label}</option>)}
                </select></p>
                </div>
            {!searchResult.length ? <p>no posts</p>
                : searchResult.map((post) =>
                    <article className="post-item" key={post.id}>
                        <h1 className='title'>{post.title}</h1>
                        <p className='body'>{post.body}</p>
                        <Comments
                            id={post.id}
                            post={post}
                        />
                        <img onClick={() => deletePost(post.id)} className='deleteImg' src={deleteImg} />
                        <EditPost
                            post={post}
                            id={post.id}
                            dataPosts={dataPosts}
                            setDataPosts={setDataPosts}
                        />
                    </article>)}
        </>
    );
}