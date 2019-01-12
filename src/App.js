import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './App.css';
import { fetchBooks } from './redux/books/book-actions';

class App extends Component {
  componentDidMount() {
      const { dispatch } = this.props;
      dispatch(fetchBooks());
  }

  render() {
      const { children } = this.props;
      return (
          <React.Fragment>
            {children}
          </React.Fragment>
      );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default connect()(App);
