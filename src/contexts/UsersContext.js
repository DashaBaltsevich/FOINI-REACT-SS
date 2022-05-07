import { createContext, useReducer } from 'react';

/*создаем контекст*/
export const UsersContext = createContext(null);

const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
/*Начальное состояние юзеров - пустой массив */
const initialState = {
  users: [],
};

/*Функция reducer - для обработки действий, если type в action успешный, то мы загружаем тело запроса (payload) в массив юзеров, а также обновляем стэйт, возвращаем новый стэйт  */
const reducer = (state, action) => {
  if (action.type === GET_USERS_SUCCESS) {
    return {
      ...state,
      users: action.payload,
    };
  }
};

export const UsersContextWrapper = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  /*Функция: когда мы ее вызываем, в action type загружается GET_USERS_SUCCESS и в action payload загружаются все юзеры */
  const onFetchUsersSuccess = (users) => {
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: users,
    });
  };

  return (
    <UsersContext.Provider
      value={{ state, actions: { onFetchUsersSuccess } }}
      children={children}
    />
  );
};
