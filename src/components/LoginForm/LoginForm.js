import { useContext } from 'react';
import { AuthenticationContext } from '../../contexts';
import { useAsync } from '../../hooks';
import { Preloader } from '../Preloader';
import { signIn } from '../../api/facades';
import './LoginForm.scss';

export const LoginForm = ({ setIsLoginFormVisible }) => {
    const { actions: { setAuthState } } = useContext(AuthenticationContext);
    const { execute, loading } = useAsync(
      signIn,
      [],
      [],
      false,
    )

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const body = {
            email: e.target.elements.email.value,
            password: e.target.elements.password.value,
        };

        try {
            const data = await execute(body);

            setAuthState(true);
            setIsLoginFormVisible(false);
            localStorage.setItem('accessToken', data?.content.token.accessToken);
            localStorage.setItem('refreshToken', data?.content.token.refreshToken);
        } catch (err) {
            return alert(err?.response?.data?.message || err?.message || 'Unknown error!')
        }
    }

    return (
        <>
            {loading && <Preloader />}
            
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
        </>
    
    );
};