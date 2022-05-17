import {
  SET_AUTHORIZATION_STATE,
  SET_USER_INFORMATION,
  GET_USERS_SUCCESS,
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
} from './types';

export const setAuthState = (isAuthorised) => {
  return {
    type: SET_AUTHORIZATION_STATE,
    payload: isAuthorised,
  };
};

export const setUserInformation = (userInformation) => {
  return {
    type: SET_USER_INFORMATION,
    payload: userInformation,
  };
};

export const onFetchUsersSuccess = (users) => {
  return {
    type: GET_USERS_SUCCESS,
    payload: users,
  };
};

export const setNotification = (type, message) => {
  const id = Math.random().toString(36).substring(2, 9);
  const colors = {
    Error: 'red',
    Success: 'green',
  };
  return {
    type: ADD_NOTIFICATION,
    toast: {
      type,
      message,
      id,
      color: colors[type],
    },
  };
};

export const deleteNotification = (id) => {
  return {
    type: DELETE_NOTIFICATION,
    id,
  };
};
