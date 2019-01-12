import API from '../../constants/api';

export const FETCH_BOOKS_REQUEST = '@@movie/FETCH_BOOKS_REQUEST';
export const FETCH_BOOKS_FAILURE = '@@movie/FETCH_BOOKS_FAILURE';
export const FETCH_BOOKS_SUCCESS = '@@movie/FETCH_BOOKS_SUCCESS';

export const CHANGE_DATA_REQUEST = '@@books/CHANGE_DATA_REQUEST';

export const fetchBooks = () => ({
    type: FETCH_BOOKS_REQUEST,
    api: API.BOOKS,
});

export const changeData = (data) => ({
    type: CHANGE_DATA_REQUEST,
    data,
});