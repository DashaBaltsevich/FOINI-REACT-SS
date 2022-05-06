import { useAsync } from '../../hooks';
import { signUp } from '../../api/facades';
import './RegForm.scss';
import { Preloader } from '../Preloader';

export const RegForm = ({ setIsRegFormVisible }) => {
    const { execute, loading } = useAsync(
        signUp,
        [],
        [],
        false,
      );

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const body = {
          firstName: e.target.elements.first_name.value,
          lastName: e.target.elements.last_name.value,
          email: e.target.elements.email.value,
          password: e.target.elements.password.value,
        };

        try {
            const data = await execute(body);

            console.log(data, body.email);
            alert(data?.message || 'Registration succeeded!');
            setIsRegFormVisible(false);
        } catch (error) {
            alert(error?.response?.data?.message  || error?.message || 'Unknown error!');
            console.dir(error);
        }
    }

    return (
        <> 
            {loading && <Preloader />}
            
            <form className="f-registration" method="POST" onSubmit={handleFormSubmit}>
                <label htmlFor="first_name" className="f-registration__field-label">Имя:</label>
                <input type="text" id="first_name" name="first_name" className="f-registration__field" />

                <label htmlFor="last_name" className="f-registration__field-label">Фамилия:</label>
                <input type="text" id="last_name" name="last_name" className="f-registration__field" />

                <label htmlFor="email" className="f-registration__field-label">Почта:</label>
                <input type="email" id="email" name="email" className="f-registration__field" />

                <label htmlFor="password" className="f-registration__field-label">Пароль:</label>
                <input type="password" id="password" name="password" className="f-registration__field" />

                <button type="submit" className="f-registration__btn-submit">Зарегистрироваться</button>
            </form>
        </>
    );
};