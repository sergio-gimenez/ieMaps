import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import ViewSplit from './ViewSplit';

ReactDOM.render(
    <Router>
        <Routes />
    </Router>,
    // <ViewSplit/>,
    document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
