import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import sagas from '../../redux/sagas';

import {
} from '../../redux/reducers/index';

const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form",
});

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const enhancers = [
  applyMiddleware(sagaMiddleware),
];

if (process.env.NODE_ENV === 'development') {
  // Enable DevTools only when rendering during development
  if (window.devToolsExtension) {
    enhancers.push(window.devToolsExtension());
  }
}

const store = createStore(
  reducer,
  compose(...enhancers),
);

sagas.forEach(saga => sagaMiddleware.run(saga));
export default store;
