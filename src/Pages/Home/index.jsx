import React from 'react';
import MyMap from "../../Components/MyMap/MyMap";
import styles from './styles.module.scss';

const Home = () => {
    return (
        <div className={styles.rootHome}>
            <MyMap/>
        </div>
    );
};

export default Home;
