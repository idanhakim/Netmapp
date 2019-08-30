import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import RoutesApp from '../Pages/routes'
import '../Styles/reset.scss';

const App = () => {

    return (
        <Router>
            <RoutesApp />
        </Router>
    );
};

export default App;
