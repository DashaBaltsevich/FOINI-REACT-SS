import { createContext, useReducer } from "react"

export const AuthentificationContext = createContext(null);

const initialState = {
    isAuthorised: false,
};

const reducer = (state, action) => {
    if(action.type === 'GET_ISAUTHORIZED_TRUE') {
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
            type: 'GET_ISAUTHORISED_TRUE',
            payload: isAuthorised,
        })
    }

    

    return (
        <AuthentificationContext.Provider value={{ state, authoriseDispatch }} children={children}/>
    );
}