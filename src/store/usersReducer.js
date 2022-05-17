import { GET_USERS_SUCCESS } from './types';

const initialState = {
  users: [],
};

export const usersReducer = (state = initialState, action) => {
  if (action.type === GET_USERS_SUCCESS) {
    return {
      ...state,
      users: action.payload,
    };
  }
  return state;
};
