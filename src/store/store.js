import { createStore } from 'redux';
import { combineReducers, applyMiddleware } from 'redux';
import { authenticationReducer } from './authenticationReducer';
import { usersReducer } from './usersReducer';
import { notificationsReducer } from './notificationsReducer';
import { composeWithDevTools } from '@redux-devtools/extension';

export const rootReducer = combineReducers({
  authenticationReducer,
  notificationsReducer,
  usersReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware()),
);
