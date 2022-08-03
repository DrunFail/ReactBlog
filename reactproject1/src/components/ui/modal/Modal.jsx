import {  useState } from 'react';
import AddPostIcon from '../AddPostIcon';
import AddPost from '../../Posts/AddPost/AddPost';
import './Modal.css';
import closeSvg from '../../../assets/close.svg';


export default function Modal({ dataPosts, postCount, setDataPosts }) {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <>
            <div onClick={() => setModalVisible(true)}>
                <AddPostIcon />
            </div>
            <div  className={modalVisible ? 'showModal' : 'noshowModal'}>
                <div className={modalVisible ? 'show' : 'noshow'}>
                    <button className='closeModal' onClick={() => setModalVisible(!modalVisible)}><img src={closeSvg }></img></button>
                    <AddPost
                        postCount={postCount }
                        setModalVisible={setModalVisible }
                        dataPosts={dataPosts}
                        setDataPosts={setDataPosts}
                    />
                </div>
            </div>
        </>

    );
}