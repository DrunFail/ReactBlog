import React from 'react';
import styles from './NoMatch.module.css';

export default function NoMatch() {
    return (
        <div className={styles.container }>
            <h1>Страница не найдена (((( </h1>
            <p>К сожалению, указанная страница не найдена</p>
            <p>Проверьте правильность введенного адреса</p>
            </div>
        );
}