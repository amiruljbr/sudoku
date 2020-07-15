import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import boardReducer from './reducers/boardReducer.js';
import userReducer from './reducers/userReducer.js';

const reducers = combineReducers({
  boardReducer,
  userReducer,
})

const store = createStore(reducers, applyMiddleware(thunk, logger))

export default store;
