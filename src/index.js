import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
// import { applyMiddleware, createStore } from 'redux';
import { Provider } from "react-redux";
// import createSagaMiddleware from "redux-saga";
// import { composeWithDevTools } from 'redux-devtools-extension';

// import logger from "redux-logger";

import './index.css';
import App from './App';
import store from "./Reducers/Store";
// import reducer from "./Reducers/Reducers";
// import reportWebVitals from './reportWebVitals';
// import rootSaga from "./Sagas/Sagas";

// const sagaMiddleware = createSagaMiddleware();
// const middleware = [sagaMiddleware, logger];
// const store = createStore(reducer,
//   composeWithDevTools(
//     applyMiddleware(...middleware))
// );

// sagaMiddleware.run(rootSaga);


const app = (
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
