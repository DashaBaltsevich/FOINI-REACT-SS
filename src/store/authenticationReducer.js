import { SET_AUTHORIZATION_STATE } from './types';
import { SET_USER_INFORMATION } from './types';

const initialState = {
  isAuthorized: false,
  userInformation: null,
};

export const authenticationReducer = (state = initialState, action) => {
  if (action.type === SET_AUTHORIZATION_STATE) {
    return {
      ...state,
      isAuthorized: action.payload,
    };
  } else if (action.type === SET_USER_INFORMATION) {
    return {
      ...state,
      userInformation: action.payload,
    };
  }
  return state;
};
