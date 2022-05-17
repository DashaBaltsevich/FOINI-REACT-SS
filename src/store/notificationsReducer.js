import { ADD_NOTIFICATION, DELETE_NOTIFICATION } from './types';

const initialState = {
  toasts: [],
};

export const notificationsReducer = (state = initialState, action) => {
  if (action.type === ADD_NOTIFICATION) {
    return {
      ...state,
      toasts: [...state.toasts, action.toast],
    };
  } else if (action.type === DELETE_NOTIFICATION) {
    const filtered = state.toasts.filter((toast) => toast.id != action.id);
    return {
      ...state,
      toasts: filtered,
    };
  }
  return state;
};
