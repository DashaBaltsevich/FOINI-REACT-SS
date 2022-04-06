import { createContext, useReducer } from 'react'

export const AuthenticationContext = createContext(null);

const SET_AUTHORIZATION_STATE = 'SET_AUTHORIZATION_STATE';
const SET_USER_INFORMATION = 'SET_USER_INFORMATION';

const initialState = {
    isAuthorized: false,
    userInformation: null,
};

const reducer = (state, action) => {
    if (action.type === SET_AUTHORIZATION_STATE) {
        return {
            ...state,
            isAuthorized: action.payload,
        }
    } else if(action.type === SET_USER_INFORMATION) {
        return {
            ...state,
            userInformation: action.payload,
        }
    }
}

export const AuthenticationContextWrapper = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setAuthState = (isAuthorised) => {
        dispatch({
            type: SET_AUTHORIZATION_STATE,
            payload: isAuthorised,
        })
    }

    const setUserInformation = (userInformation) => {
        dispatch({
            type: SET_USER_INFORMATION,
            payload: userInformation
        })
    }

    return (
        <AuthenticationContext.Provider value={{ state, actions: { setAuthState, setUserInformation } }} children={children} />
    );
}