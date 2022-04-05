import { useContext } from 'react';
import axios from 'axios';
import { AuthenticationContext } from '../../contexts';
import './LoginForm.scss';

export const LoginForm = ({ setIsLoginFormVisible }) => {
    const { actions: { setAuthState } } = useContext(AuthenticationContext);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const body = {
            email: e.target.elements.email.value,
            password: e.target.elements.password.value,
        };

        axios.post(`https://infinite-woodland-61407.herokuapp.com/api/v1/sign-in`, body)
            .then(({ data }) => {
               localStorage.setItem('accessToken', data?.content.token.accessToken);
               localStorage.setItem('refreshToken', data?.content.token.refreshToken);

                setAuthState(true);
                setIsLoginFormVisible(false);
            })
            .catch((error) => alert(error?.response?.data?.message || error?.message || 'Unknown error!')
        );
    }

    return (
        <form
          className="f-login"
          method="POST"
          onSubmit={handleFormSubmit}
        >
            <label htmlFor="email" className="f-login__field-label">Почта:</label>
            <input type="email" id="email" name="email" className="f-login__field" />

            <label htmlFor="password" className="f-login__field-label">Пароль:</label>
            <input type="password" id="password" name="password" className="f-login__field" />

            <button type="submit" className="f-login__btn-submit">Войти</button>
        </form>
    );
};