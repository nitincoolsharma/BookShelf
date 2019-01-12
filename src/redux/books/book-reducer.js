import { CHANGE_DATA_REQUEST, FETCH_BOOKS_FAILURE, FETCH_BOOKS_REQUEST, FETCH_BOOKS_SUCCESS } from './book-actions';

const initialState = {
    data: {},
    isLoading: false,
    isFailed: false,
};

const bookReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case FETCH_BOOKS_SUCCESS:
            newState = {
                ...state,
                data: action.data,
                isLoading: false,
                isFailed: false,
            };
            break;
        case FETCH_BOOKS_REQUEST:
            newState = {
                ...state,
                isLoading: true,
            };
            break;
        case FETCH_BOOKS_FAILURE:
            newState = {
                ...state,
                isLoading: false,
                isFailed: true,
            };
            break;
        case CHANGE_DATA_REQUEST:
            newState = {
                ...state,
                data: action.data,
            };
            break;
        default:
            newState = state;
    }
    return newState;
};

export default bookReducer;