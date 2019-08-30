import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import Header from "../Components/Header";
import AboutUs from "../Pages/AboutUs";
import ContactUs from "../Pages/ContactUs";
import Home from "../Pages/Home";
import Footer from "../Components/Footer";

const App = () => {
    const preUrl = `${process.env.NODE_ENV === 'development' ? '/' : '/Netmapp/'}`;
    return (
        <Router>
            <Route path={preUrl} component={Header}/>
            <Route path={preUrl} exact component={Home}/>
            <Route path={`${preUrl}about-us/`} component={AboutUs}/>
            <Route path={`${preUrl}contact-us/`} component={ContactUs}/>
            <Route path={preUrl} component={Footer}/>
        </Router>
    );
};

export default App;
