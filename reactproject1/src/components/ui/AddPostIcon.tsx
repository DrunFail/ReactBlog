import React from 'react';
import addPos from '../../assets/addPost.png';
import styles from './AddPostIcon.module.scss';


export default function AddPostIcon() {
    return (
        <>
            <img
                className={styles.addPost }
                src={addPos}
                alt="add post" />
        </>
    );
}
