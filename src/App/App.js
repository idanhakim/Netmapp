import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import Header from "../Components/Header";
import AboutUs from "../Pages/AboutUs";
import ContactUs from "../Pages/ContactUs";
import Home from "../Pages/Home";
import Footer from "../Components/Footer";

const App = () => {
    return (
        <Router>
            <Route path="/" component={Header}/>
            <Route path="/Netmapp/" exact component={Home}/>
            <Route path="/Netmapp/about-us/" component={AboutUs}/>
            <Route path="/Netmapp/contact-us/" component={ContactUs}/>
            <Route path="/" component={Footer}/>
        </Router>
    );
};

export default App;
