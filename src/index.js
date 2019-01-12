import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStores';

import Routes from './routes/routes';
import './index.css';

const store = configureStore();

ReactDOM.render(
    <HashRouter>
        <Provider store={store}>
            <Routes />
        </Provider>
    </HashRouter>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

