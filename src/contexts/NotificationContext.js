import { createContext, useReducer } from 'react';

export const NotificationContext = createContext(null);

const iniitialState = {
  toasts: [],
};

const reducer = (state, action) => {
  if (action.type === 'ADD_NOTIFICATION') {
    return {
      ...state,
      toasts: [...state.toasts, action.toast],
    };
  } else if (action.type === 'DELETE_NOTIFICATION') {
    const updatedToast = state.toasts.filter((e) => e.id != action.id);
    return {
      ...state,
      toasts: updatedToast,
    };
  }
};

export const NotificationContextWrapper = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, iniitialState);

  const setNotification = (type, message, color) => {
    const id = Math.random().toString(36).substring(2, 9);
    dispatch({
      type: 'ADD_NOTIFICATION',
      toast: {
        type,
        message,
        id,
        color,
      },
    });

    setTimeout(() => {
      dispatch({
        type: 'DELETE_NOTIFICATION',
        id,
      });
    }, 3000);
  };

  const deleteNotification = (id) => {
    dispatch({
      type: 'DELETE_NOTIFICATION',
      id,
    });
  };

  return (
    <NotificationContext.Provider
      value={{ state, actions: { setNotification, deleteNotification } }}
      children={children}
    />
  );
};

// export const useToastStateContext = () => useContext(ToastStateContext);
// export const useToastDispatchContext = () => useContext(ToastDispatchContext);
