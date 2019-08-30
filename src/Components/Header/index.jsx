import React from 'react';
import {Link} from "react-router-dom";
import styles from './styles.module.scss';

const Header = () => {
    return (
        <header className={styles.rootHeader}>
            <div className={styles.logoBox}>
                Netmapp
            </div>
            <nav className={styles.navBox}>
                <Link to="/">Home</Link>
                <Link to="/contact-us">Contact Us</Link>
                <Link to="/about-us">About US</Link>
            </nav>
        </header>
    );
};

export default Header;
