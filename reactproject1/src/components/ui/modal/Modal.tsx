import React, { useState } from 'react';
import closeSvg from '../../../assets/close.svg';
import AddPostIcon from '../AddPostIcon';
import styles from './Modal.module.scss';

interface ModalProps {
    children?: React.ReactNode
}


export default function Modal({ children }: ModalProps) {
    const [modalVisible, setModalVisible] = useState(false);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Escape') {
            setModalVisible(false)
        }
    }


    return (
        <>
            <div onClick={() => setModalVisible(true)}>
                <AddPostIcon />
            </div>
            {modalVisible &&

                <div className={styles.showModal}
                    tabIndex={0}
                    onKeyDown={handleKeyDown}>
                    <div className={styles.contentModal}>
                        <button
                            className={styles.closeModal }
                            onClick={() => setModalVisible(false)}>
                            <img src={closeSvg} alt='close'></img>
                        </button>
                        {children}
                    </div>
                </div>
            }
        </>
    );
}