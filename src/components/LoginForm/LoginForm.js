import ReactDOM from 'react-dom';
import '../RegForm/RegForm.scss';

export const LoginForm = ({ setModalLogState }) => {

    return ReactDOM.createPortal(
        <div className='form-reg__wrapper'>
            <form className="form-reg"onSubmit={''}>                
                <label for="email" className="label-reg">Почта:</label> 
                <input type="email" id="email" onChange={''} className="input-reg"/>
                
                <label for="password" className="label-reg">Пароль:</label>
                <input type="password" id="password" onChange={''} className="input-reg"/>
                
                <button className="btn-form-reg">Войти</button>
            </form>
            <button className="btn-close" onClick={() => {
                setModalLogState(false)
            }}>Закрыть</button>
        </div>,
        document.getElementById('root')
    );
};