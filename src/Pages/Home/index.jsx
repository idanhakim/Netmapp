import React from 'react';
import Map from "../../Components/Map";
import styles from './styles.module.scss';

const Home = () => {
    return (
        <div className={styles.rootHome}>
            <Map/>
        </div>
    );
};

export default Home;
