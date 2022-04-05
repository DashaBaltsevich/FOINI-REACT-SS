import { createContext, useReducer } from 'react'

export const AuthenticationContext = createContext(null);

const SET_AUTHORIZATION_STATE = 'SET_AUTHORIZATION_STATE';
const initialState = {
    isAuthorized: false,
};

const reducer = (state, action) => {
    if (action.type === SET_AUTHORIZATION_STATE) {
        return {
            ...state,
            isAuthorized: action.payload,
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

    return (
        <AuthenticationContext.Provider value={{ state, actions: { setAuthState } }} children={children} />
    );
}