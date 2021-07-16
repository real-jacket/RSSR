import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

export default (defaultState = {}) => {
  return createStore(reducer, defaultState, applyMiddleware(thunk));
};
