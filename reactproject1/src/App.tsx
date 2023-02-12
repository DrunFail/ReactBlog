import React, { useState } from 'react';
import styles from './App.module.scss';
import Pagination from './components/Pagination/Pagination';
import AddPost from './components/Posts/AddPost/AddPost';
import Search from './components/Search/Search';
import Modal from './components/ui/modal/Modal';
import store from './store';
import PostList from './components/Posts/PostList/PostList';
import { observer } from 'mobx-react-lite';

const App = observer(() => {
    const [selectedPage, setSelectedPage] = useState(1);
    const [limitPostOnPage, setLimitPostOnPage] = useState(10);
    const [postCount, setPostCount] = useState(100);
    const [search, setSearch] = useState('')

    const onPage = (numberPage: number): void =>
        setSelectedPage(numberPage)


    const getCountPostOnPage = (count: number): void => {
        setLimitPostOnPage(count)
    }
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    return (
        <div className={styles.App}>
            <Modal>
                <AddPost />
            </Modal>

            <Search
                search={search}
                handleSearch={handleSearch }
                 />

            <PostList
                posts={store.posts}
                selectedPage={selectedPage}
                limitPostOnPage={limitPostOnPage}
                getCountPostOnPage={getCountPostOnPage}
                search={search }
            />

            <Pagination
                limitPostOnPage={limitPostOnPage}
                postCount={postCount}
                selectedPage={selectedPage}
                onPage={onPage}
            />

        </div>

    );
}

)

export default App;

