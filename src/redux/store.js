import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

function configureStore() {
    const store = createStore(rootReducer, compose(applyMiddleware(...middlewares)),)
    sagaMiddleware.run(rootSaga);
    return store;
}

const store = configureStore()

export default store;