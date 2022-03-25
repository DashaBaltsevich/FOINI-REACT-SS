import { ModalWindow } from '../ModalWindow/ModalWindow';
import { useState } from 'react';
import '../RegForm/RegForm.scss';
import axios from 'axios';

export const LoginForm = ({ setModalLogState }) => {

    const [formLoginValues, setFormLoginValues] = useState({
        email: '',
        password: '',
    })

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log('Отправлено');
        console.log(formLoginValues)

        axios.post(``, formLoginValues)
            .then((data) => {
               console.log(data)
            })
            .catch(() => {
              throw new Error('Error. No data');
            })
    }

    return (
        <ModalWindow>
            <form className="form-reg" method="POST" onSubmit={handleFormSubmit}>                
                <label htmlFor="email" className="label-reg">Почта:</label> 
                <input type="email" id="email" value={formLoginValues.email} className="input-reg" onChange={(e) => setFormLoginValues(oldValues => ({
                    ...oldValues,
                    email: e.target.value
                }))}/>
                
                <label htmlFor="password" className="label-reg">Пароль:</label>
                <input type="password" id="password" value={formLoginValues.password} className="input-reg" onChange={(e) => setFormLoginValues(oldValues => ({
                    ...oldValues,
                    password: e.target.value
                }))}/>
                
                <button className="btn-form-reg" type="submit">Войти</button>
            </form>
            <button className="btn-close" type="submit" onClick={() => {
                setModalLogState(false)
            }}>Закрыть</button>
        </ModalWindow>
    );
};