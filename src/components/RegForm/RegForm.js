import ReactDOM from 'react-dom';
import './RegForm.scss';



export const RegForm = ({ setModalRegState }) => {

    return ReactDOM.createPortal(
        <div className='form-reg__wrapper'>
            <form className="form-reg"onSubmit={''}>
                <label for="firstName" className="label-reg">Имя:</label>
                <input type="text" id="firstName" onChange={''} className="input-reg"/>
                
                <label for="lastName" className="label-reg">Фамилия:</label>
                <input type="text" id="lastName" onChange={''} className="input-reg"/>
                
                <label for="email" className="label-reg">Почта:</label> 
                <input type="email" id="email" onChange={''} className="input-reg"/>
                
                <label for="password" className="label-reg">Пароль:</label>
                <input type="password" id="password" onChange={''} className="input-reg"/>
                
                <button className="btn-form-reg">Зарегистрироваться</button>
            </form>
            <button className="btn-close" onClick={() => {
                setModalRegState(false)
            }}>Закрыть</button>
        </div>,
        document.getElementById('root')
    );
};