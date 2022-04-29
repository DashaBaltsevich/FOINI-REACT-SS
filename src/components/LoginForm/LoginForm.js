import { useContext } from 'react';
import { httpClient } from '../../api/httpClient';
import { AuthenticationContext } from '../../contexts';
import { useAsync } from '../../hooks'
import { signIn } from '../../api/facades';
import './LoginForm.scss';

export const LoginForm = ({ setIsLoginFormVisible }) => {
    const { actions: { setAuthState } } = useContext(AuthenticationContext);
    const { execute, value, error, loading } = useAsync(
      signIn,
      [],
      [],
      false,
    )

      /* first arg: async function */
      /* second argument: async func args in array */
      /* third argument: dependencies in array */
      /* fourth argument: immediate flag which is true by default */

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const body = {
            email: e.target.elements.email.value,
            password: e.target.elements.password.value,
        };

        const data = execute(body);

        if (error) {
            // return alert(error?.response?.data?.message || error?.message || 'Unknown error!')
        }

        localStorage.setItem('accessToken', data?.content.token.accessToken);
        localStorage.setItem('refreshToken', data?.content.token.refreshToken);

        setAuthState(true);
        setIsLoginFormVisible(false);
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