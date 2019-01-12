import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { FETCH_BOOKS_SUCCESS, FETCH_BOOKS_FAILURE } from '../../redux/books/book-actions';

export default function* fetchBookWorkerSaga(action) {
    try {
        const response = yield call(axios.get, action.api);
        yield put({
            type: FETCH_BOOKS_SUCCESS,
            data: response.data,
        });
    } catch (e) {
        // do error action
        console.error('error in api call', e);
        yield put({ type: FETCH_BOOKS_FAILURE });
    }
}
