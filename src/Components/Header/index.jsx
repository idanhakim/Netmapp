import React from 'react';
import {Link} from "react-router-dom";
import styles from './styles.module.scss';

const Header = () => {
    const preUrl = `${process.env.NODE_ENV === 'development' ? '/' : '/Netmapp/'}`;
    return (
        <header className={styles.rootHeader}>
            <div className={styles.logoBox}>
                Netmapp
            </div>
            <nav className={styles.navBox}>
                <Link to={preUrl}>Home</Link>
                <Link to={`${preUrl}contact-us/`} >Contact Us</Link>
                <Link to={`${preUrl}about-us/`} >About US</Link>
            </nav>
        </header>
    );
};

export default Header;
