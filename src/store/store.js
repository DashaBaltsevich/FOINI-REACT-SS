import { createStore } from 'redux';
import { combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import {
  authenticationReducer,
  notificationsReducer,
  usersReducer,
} from './reducers';

export const rootReducer = combineReducers({
  authenticationReducer,
  notificationsReducer,
  usersReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
