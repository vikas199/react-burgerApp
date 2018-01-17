import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import reducer from './reducers/index'
import createSagaMiddleware from 'redux-saga'
import {watchAuth, watchIngredients, watchPurchase } from './sagas/index'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


const sagaMiddleware =createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk, sagaMiddleware)
))

sagaMiddleware.run(watchAuth)
sagaMiddleware.run(watchIngredients)
sagaMiddleware.run(watchPurchase)


const app = (
    <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
