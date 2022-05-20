import { ADD_NOTIFICATION, DELETE_NOTIFICATION } from '../constants';

const initialState = {
  toasts: [],
};

export const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {
        ...state,
        toasts: [...state.toasts, action.toast],
      };
    case DELETE_NOTIFICATION: {
      const filtered = state.toasts.filter((toast) => toast.id !== action.id);
      return {
        ...state,
        toasts: filtered,
      };
    }
    default:
      return state;
  }
};
