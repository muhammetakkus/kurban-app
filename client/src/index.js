import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom'
import { Provider } from 'react-redux'

import './assets/css/global.css';
import './utils/axios';

import App from './App';




import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist';
import store from './store'
let persistor = persistStore(store);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router>
                <App />
            </Router>
        </PersistGate>
    </Provider>
);