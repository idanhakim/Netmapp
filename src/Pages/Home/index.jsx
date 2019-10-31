import React from 'react';
import Map from "../../Components/Map";
import styles from './styles.module.scss';

const Home = () => {
    return (
        <div className={styles.rootHome}>
            <h1 className={styles.title}>Welcome to Netmapp!!!</h1>
            <Map/>
        </div>
    );
};

export default Home;
