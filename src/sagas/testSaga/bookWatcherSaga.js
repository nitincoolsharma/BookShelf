import { takeLatest } from 'redux-saga/effects';
import { FETCH_BOOKS_REQUEST } from '../../redux/books/book-actions';
import fetchBookWorkerSaga from './bookWorkerSaga';

function*  fetchBooksWatcher() {
    yield takeLatest(FETCH_BOOKS_REQUEST, fetchBookWorkerSaga);
}

export default fetchBooksWatcher;