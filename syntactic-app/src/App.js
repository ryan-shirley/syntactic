import React from 'react';
import Routes from './Routes'
import { BrowserRouter } from "react-router-dom";
import './App.scss';

function App() {
    return (
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    );
}

export default App;
