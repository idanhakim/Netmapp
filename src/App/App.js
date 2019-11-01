import React from 'react';
import {HashRouter} from "react-router-dom";
import {RoutesApp} from '../Pages/routes'
import '../Styles/reset.scss';

const App = () => {

    return (
        <HashRouter
            basename={process.env.NODE_ENV === 'development' ? '/Netmapp/' : '/'}
        >
            <RoutesApp/>
        </HashRouter>
    );
};

export default App;
