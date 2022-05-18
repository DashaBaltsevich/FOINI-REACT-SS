import { SET_AUTHORIZATION_STATE, SET_USER_INFORMATION } from '../constants';

const initialState = {
  isAuthorized: false,
  userInformation: null,
};

export const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHORIZATION_STATE:
      return {
        ...state,
        isAuthorized: action.payload,
      };
    case SET_USER_INFORMATION:
      return {
        ...state,
        userInformation: action.payload,
      };
    default:
      return state;
  }
};
