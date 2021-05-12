import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'; 
import logger from 'redux-logger';
// Bring in middleware for saga. woot
import createSagaMiddleware from 'redux-saga';
import {put, takeEvery} from 'redux-saga/effects';
import Axios from 'axios';


import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

// ---------- Sagas ----------
function* fetchBooks() {
  try {
    // yield make us wait until the async thing (axios) is done
    // keep the response in a variable to access later
    const response = yield Axios.get('/books');

    // when its done successfully the 'dispatch' the action to set reducer
    yield put( {type: 'SET_BOOK_LIST', payload: response.data} );
  } catch (error) {
    alert(`Sorry. Thnings aren't working at the moment`);
    console.log('Error getting books', error);
  }
}

function* addBook (action) {
try {
    yield Axios.post('/books', action.payload);

    yield put({type: 'FETCH_BOOKS'});
  } catch (error) {
    alert(`Sorry, Things are working at the moment`)
    console.log('Error adding book', error);
  }
}

// Saga Setup 1 - create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Saga Setup 2 - make the watcher function - name is taco
// * makes this a "generator function"
function* watcherSaga() {
  yield takeEvery('FETCH_BOOKS', fetchBooks);
  yield takeEvery('ADD_BOOK', addBook)
}


const bookList = (state = [], action) => {
  // TODO - set book list with data from server
  if (action.type === 'SET_BOOK_LIST') {
    // the action payload is a new array from the server
    // it has All the information in it - no need to spread & add to previous state
    return action.payload;
  }
  return state;
}

const reduxStore = createStore(
  combineReducers({
    bookList
  }),
  // Saga Setup 4 - add sagaMiddleware
  applyMiddleware(logger, sagaMiddleware)
);

// Saga Setup 3 - make watcherSaga run
sagaMiddleware.run( watcherSaga );


ReactDOM.render(<Provider store={reduxStore}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
