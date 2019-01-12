import React from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router';
import HomePage from '../pages/HomePage';
import SearchPage from '../pages/SearchPage';
import App from '../App';

const Routes = ({ location, history }) => {
    return (
        <App>
            <Route path="/home" exact component={HomePage} />
            <Route path="/" exact component={HomePage} />
            <Route path="/search" exact component={SearchPage} />
        </App>
    )
};

Routes.propTypes = {
    location: PropTypes.object,
    history: PropTypes.object,
};

Routes.defaultProps = {
    location: {},
    history: {},
};

export default withRouter(Routes);