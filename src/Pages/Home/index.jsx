import React from 'react';
import Map from "../../Components/Map";
import styles from './styles.module.scss';
import AnimationMarker from "../../Components/AnimationMarker";
import test from "./test.svg";

const Home = () => {
    return (
        <div className={styles.rootHome}>
            <div className={styles.titleContainer}>

                {/*<div className={styles.markerWrapper}><AnimationMarker/></div>*/}

                <h1 className={styles.title}>Welcome to NetMap!</h1>

                <img src={test} className={styles.bg}/>
            </div>
            <Map/>
        </div>
    );
};

export default Home;
