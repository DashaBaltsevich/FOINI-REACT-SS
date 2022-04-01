import { useState, useContext } from 'react';
import { AuthentificationContext } from '../../contexts/AuthentificationContext';
import './LoginForm.scss';
import axios from 'axios';

export const LoginForm = ({ setIsLoginForm }) => {
    const [formLoginValues, setFormLoginValues] = useState({
        email: '',
        password: '',
    })

    const {state, authoriseDispatch} = useContext(AuthentificationContext);


    const handleFormSubmit = (event) => {
        event.preventDefault();
        
        axios.post(`https://infinite-woodland-61407.herokuapp.com/api/v1/sign-in`, formLoginValues)
            .then(({ data }) => {
               localStorage.setItem('accessToken', data?.content.token.accessToken);
               localStorage.setItem('refreshToken', data?.content.token.refreshToken);

               authoriseDispatch(true);
               setIsLoginForm(false);

            })
          .catch((error) => {alert(error?.response?.data?.message || 'Unknown error!');});
    }
    return (
            <form className="f-login" method="POST" onSubmit={handleFormSubmit}>                
                <label htmlFor="email" className="f-login__field-label">Почта:</label> 
                <input type="email" id="email" value={formLoginValues.email} className="f-login__field" onChange={(e) => setFormLoginValues(oldValues => ({
                    ...oldValues,
                    email: e.target.value
                }))}/>
                
                <label htmlFor="password" className="f-login__field-label">Пароль:</label>
                <input type="password" id="password" value={formLoginValues.password} className="f-login__field" onChange={(e) => setFormLoginValues(oldValues => ({
                    ...oldValues,
                    password: e.target.value
                }))}/>
                
                <button className="btn-form-login" type="submit">Войти</button>
            </form>
    );
};