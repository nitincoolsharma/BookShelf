import { all } from 'redux-saga/effects';
import fetchBooksWatcher from './testSaga/bookWatcherSaga';

export default function* rootSaga() {
    yield all([
        fetchBooksWatcher(),
    ]);
}
