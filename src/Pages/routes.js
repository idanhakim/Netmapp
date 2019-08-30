import React from "react";
import {Route} from "react-router-dom";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Home from "./Home";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";

const preUrl = `${process.env.NODE_ENV === 'development' ? '/' : '/Netmapp/'}`;

const routes = [
    {
        path: preUrl,
        component: Header,
        exact: false,
        label: ''
    },
    {
        path: preUrl,
        component: Home,
        exact: true,
        label: ''
    },
    {
        path: `${preUrl}about-us/`,
        component: AboutUs,
        exact: true,
        label: ''
    },
    {
        path: `${preUrl}contact-us/`,
        component: ContactUs,
        exact: true,
        label: ''
    },
    {
        path: preUrl,
        component: Footer,
        exact: false,
        label: ''
    }
];

const RoutesApp = () => routes.map((route, i) => <Route key={i} {...route} />);

export default RoutesApp;