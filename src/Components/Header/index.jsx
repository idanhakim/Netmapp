import React from 'react';
import styles from './styles.module.scss';
import {LinksNav} from '../../Pages/routes';

const Header = () => {
    return (
        <header className={styles.rootHeader}>
            <div className={styles.logoBox}>NetMap</div>
            <nav className={styles.navBox}>
                <LinksNav/>
            </nav>
        </header>
    );
};

export default Header;
