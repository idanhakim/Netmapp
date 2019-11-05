import React from 'react';
import Map from "../../Components/Map";
import styles from './styles.module.scss';
import test from "./test.svg";

const Home = () => {
    return (
        <div className={styles.rootHome}>
            <div className={styles.titleContainer}>

                <h1 className={styles.title}>Welcome to NetMap!</h1>

                <img src={test} className={styles.bg}/>
            </div>
            <Map/>
        </div>
    );
};

export default Home;
