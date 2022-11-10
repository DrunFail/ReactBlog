import React, { useState } from 'react';
import closeSvg from '../../../assets/close.svg';
import AddPost from '../../Posts/AddPost/AddPost';
import AddPostIcon from '../AddPostIcon';
import './Modal.css';

interface ModalProps {
    dataPosts: any,
    postCount: any,
    setDataPosts: any
}


export default function Modal({ dataPosts, postCount, setDataPosts }: ModalProps) {
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