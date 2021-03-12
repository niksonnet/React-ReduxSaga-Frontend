import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from 'redux-devtools-extension';

import logger from "redux-logger";
import rootReducer from './Reducers';
import rootSaga from "../Sagas/Sagas";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, logger];

const store = createStore(rootReducer,
  composeWithDevTools(
    applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga);

export default store;