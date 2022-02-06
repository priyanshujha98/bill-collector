import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from "redux-saga";
import { rootReducer } from './reducers/reducers';
import rootSaga from './sagas/sagas';

const parameterEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagaMiddleware = createSagaMiddleware()

let store = createStore(rootReducer, parameterEnhancer(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(rootSaga)

export default store