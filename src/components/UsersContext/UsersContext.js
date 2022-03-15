import { createContext, useReducer } from "react";

/*создаем контекст*/
export const UsersContext = createContext(null);

/*Начальное состояние юзеров - пустой массив */
const initialState = {
    users: [],
}

/*Функция reducer, если type в action успешный, то мы загружаем тело запроса (payload) в массив юзеров, а также обновляем стэйт, возвращаем новый стэйт  */
const reducer = (state, action) => {
    if(action.type === 'GET_USERS_SUCCESS') {
        return {
            ...state,
            users: action.payload,
        }
    }
}

export const SetUserContext = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const usersDispatch = (users) => {
        dispatch({
            type: 'GET_USERS_SUCCESS',
            payload: users,
        })
    }

    return (
        <UsersContext.Provider value={{state, usersDispatch}} children={children} />
    )
}