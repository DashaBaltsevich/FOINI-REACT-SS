import { createContext, useReducer } from "react"

export const AuthentificationContext = createContext(null);

const initialState = {
    isAuthorised: false,
};

const reducer = (state, action) => {
    if(action.type === 'SET_AUTHORIZATION_STATE') {
        return {
            ...state,
            isAuthorised: action.payload,
        }
    }
}

export const SetAuthentificationContext = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const authoriseDispatch = (isAuthorised) => {
        dispatch({
            type: 'SET_AUTHORIZATION_STATE',
            payload: isAuthorised,
        })
    }

    

    return (
        <AuthentificationContext.Provider value={{ state, authoriseDispatch }} children={children}/>
    );
}