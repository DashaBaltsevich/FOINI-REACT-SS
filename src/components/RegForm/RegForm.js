import ReactDOM from 'react-dom';
import { useState } from 'react';
import axios from 'axios';
import './RegForm.scss';



export const RegForm = ({ setModalRegState }) => {

    const [formRegValues, setFormRegValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log('Отправлено');
        console.log(formRegValues)

        axios.post(`/users`, formRegValues)
            .then((data) => {
               console.log(data)
            })
            .catch(() => {
              throw new Error('Error. No data');
            })
    }

    return ReactDOM.createPortal(
        <div className='form-reg__wrapper'>
            <form className="form-reg" method="POST" onSubmit={handleFormSubmit}>
                <label htmlFor="firstName" className="label-reg">Имя:</label>
                <input type="text" id="firstName" className="input-reg" value={formRegValues.firstName} onChange={(e) => setFormRegValues(oldValues => ({
                    ...oldValues,
                    firstName: e.target.value
                }))}/>
                
                <label htmlFor="lastName" className="label-reg">Фамилия:</label>
                <input type="text" id="lastName" className="input-reg" value={formRegValues.lastName} onChange={(e) => setFormRegValues(oldValues => ({
                    ...oldValues,
                    lastName: e.target.value
                }))}/>
                
                <label htmlFor="email" className="label-reg">Почта:</label> 
                <input type="email" id="email" className="input-reg" value={formRegValues.email} onChange={(e) => setFormRegValues(oldValues => ({
                    ...oldValues,
                    email: e.target.value
                }))}/>
                
                <label htmlFor="password" className="label-reg">Пароль:</label>
                <input type="password" id="password" className="input-reg" value={formRegValues.password} onChange={(e) => setFormRegValues(oldValues => ({
                    ...oldValues,
                    password: e.target.value
                }))}/>
                
                <button className="btn-form-reg">Зарегистрироваться</button>
            </form>
            <button className="btn-close" onClick={() => {
                setModalRegState(false)
            }}>Закрыть</button>
        </div>,
        document.getElementById('root')
    );
};