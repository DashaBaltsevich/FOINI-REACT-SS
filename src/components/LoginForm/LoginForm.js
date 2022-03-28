import { useState } from 'react';
import './LoginForm.scss';
import axios from 'axios';

export const LoginForm = ({ setIsLoginForm }) => {

    const [formLoginValues, setFormLoginValues] = useState({
        email: '',
        password: '',
    })

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log('Отправлено');
        console.log(formLoginValues);

        axios.post(`https://infinite-woodland-61407.herokuapp.com/api/sign-in`, formLoginValues)
            .then((data) => {
               localStorage.setItem('accessToken', data?.data?.content.token.accessToken);
               localStorage.setItem('refreshToken', data?.data?.content.token.refreshToken);
               console.log(localStorage);
               setIsLoginForm(false);
            })
            .catch((error) => {
              alert(error);
            })
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