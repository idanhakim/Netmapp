import React, {Fragment} from "react";
import {Route, Link} from "react-router-dom";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Home from "./Home";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";

// const preUrl = `${process.env.NODE_ENV === 'development' ? '/' : '/Netmapp/'}`;
const preUrl = `/`;

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
        label: 'Home'
    },
    {
        path: `${preUrl}about-us/`,
        component: AboutUs,
        exact: true,
        label: 'About-Us'
    },
    {
        path: `${preUrl}contact-us/`,
        component: ContactUs,
        exact: true,
        label: 'Contact-Us'
    },
    {
        path: preUrl,
        component: Footer,
        exact: false,
        label: ''
    }
];

export const LinksNav = () => {
    const lengthIdx = routes.length - 1;
    return (
        <Fragment>
            {routes.reduce((acc, {path, label}, i) => {
                if (i === 0 || i === lengthIdx) return acc;
                return [...acc, <Link key={i} to={path}>{label}</Link>]
            }, [])}
        </Fragment>
    );
};

export const RoutesApp = () => {
    const lengthIdx = routes.length - 1;
    return (
        <Fragment>
            <Route {...routes[0]} /> //Header
            <main>
                {routes.reduce((acc, route, i) => {
                    if (i === 0 || i === lengthIdx) return acc;
                    return [...acc, <Route key={i} {...route} />]
                }, [])}
            </main>
            <Route {...routes[lengthIdx]} /> //Footer
        </Fragment>
    );
};
