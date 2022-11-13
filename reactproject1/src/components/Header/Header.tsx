import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

export default function Header() {
    return (
        <header className={styles.header }>
            <Link
                className={styles.header_logo}
                to="/">
                blog
            </Link>
            <nav className={styles.header_nav }>
                <Link
                    className={styles.header_link}
                    to="">
                    posts
                </Link>
                <Link
                    className={styles.header_link}
                    to="about">
                    about
                </Link>
                </nav>
            </header>
        );
}