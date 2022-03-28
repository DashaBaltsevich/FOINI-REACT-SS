import { useState } from 'react';
import axios from 'axios';
import './RegForm.scss';

export const RegForm = ({ setIsRegForm }) => {
    const [formRegValues, setFormRegValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })

    const handleFormSubmit = (event) => {
        event.preventDefault();
        axios.post(`https://infinite-woodland-61407.herokuapp.com/api/sign-up`, formRegValues)
            .then(({ data }) => {
               alert(data?.message || 'Registration succeeded!');
               setIsRegForm(false);
            })
            .catch((error) => alert(error?.response?.data?.message || 'Unknown error!'))
    }

    return (
            <form className="f-registration" method="POST" onSubmit={handleFormSubmit}>
                <label htmlFor="firstName" className="f-registration__field-label">Имя:</label>
                <input type="text" id="firstName" className="f-registration__field" value={formRegValues.firstName} onChange={(e) => setFormRegValues(oldValues => ({
                    ...oldValues,
                    firstName: e.target.value
                }))}/>
                
                <label htmlFor="lastName" className="f-registration__field-label">Фамилия:</label>
                <input type="text" id="lastName" className="f-registration__field" value={formRegValues.lastName} onChange={(e) => setFormRegValues(oldValues => ({
                    ...oldValues,
                    lastName: e.target.value
                }))}/>
                
                <label htmlFor="email" className="f-registration__field-label">Почта:</label> 
                <input type="email" id="email" className="f-registration__field" value={formRegValues.email} onChange={(e) => setFormRegValues(oldValues => ({
                    ...oldValues,
                    email: e.target.value
                }))}/>
                
                <label htmlFor="password" className="f-registration__field-label">Пароль:</label>
                <input type="password" id="password" className="f-registration__field" value={formRegValues.password} onChange={(e) => setFormRegValues(oldValues => ({
                    ...oldValues,
                    password: e.target.value
                }))}/>
                
                <button className="btn-form-registration">Зарегистрироваться</button>
            </form>
    );
};