import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './root-reducer';
import rootSaga from '../sagas/index';

const initialState = {};
// const enhancers = [];
export const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

/*if (process.env.NODE_ENV === 'development') {
    const { devToolsExtension } = window;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
}*/

const enhancers = composeEnhancers(
    applyMiddleware(sagaMiddleware),
);

const store = () => {
    const createdStore = createStore(
        rootReducer,
        initialState,
        enhancers,
    );
    sagaMiddleware.run(rootSaga);
    return createdStore;
};

export default store;
