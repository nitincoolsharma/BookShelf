import { combineReducers } from 'redux';
import books from './books/book-reducer';

export default combineReducers({
    books,
});
