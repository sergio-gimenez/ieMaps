import React from 'react';
import logo from './icon.png';
import './App.css';

import InitialForm from 'initialForm.js'

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <InitialForm />
            </header>
        </div>
    );
}

export default App;

