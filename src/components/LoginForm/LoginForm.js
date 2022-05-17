import { setAuthState, setNotification } from '../../store/actions';
import { useDispatch } from 'react-redux';
import { useAsync } from '../../hooks';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Preloader } from '../Preloader';
import { signIn } from '../../api/facades';
import './LoginForm.scss';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required')
    .max(30, 'Are you really sure that your email is that big?'),
  password: yup
    .string()
    .required('Password is required')
    .min(4, 'Must be more than 4 characters'),
});

export const LoginForm = ({ setIsLoginFormVisible }) => {
  const { execute, loading } = useAsync(signIn, [], [], false);

  const dispatch = useDispatch();

  const handleFormSubmit = async (values) => {
    try {
      const data = await execute(values);

      dispatch(setAuthState(true));
      setIsLoginFormVisible(false);
      dispatch(setNotification('Success', 'Authentication successful'));

      localStorage.setItem('accessToken', data?.content.token.accessToken);
      localStorage.setItem('refreshToken', data?.content.token.refreshToken);
    } catch (err) {
      return dispatch(
        setNotification(
          'Error',
          `${err?.response?.data?.message}` ||
            `${err?.message}` ||
            `Unknown error!`,
        ),
      );
    }
  };

  return (
    <>
      {loading && <Preloader />}

      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validateOnBlur={false}
        validationSchema={validationSchema}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ values }) => (
          <Form className="f-login">
            <div className="f-login__row">
              <label htmlFor="email" className="f-login__field-label">
                Почта:
              </label>
              <br />
              <Field
                type="email"
                id="email"
                name="email"
                className="f-login__field"
                value={values.email}
              />
              <ErrorMessage
                name="email"
                component={({ children }) => (
                  <p className="f-login__field-error">{children}</p>
                )}
              />
            </div>

            <div className="f-login__row">
              <label htmlFor="password" className="f-login__field-label">
                Пароль:
              </label>
              <br />
              <Field
                type="password"
                id="password"
                name="password"
                className="f-login__field"
              />
              <ErrorMessage
                name="password"
                component={({ children }) => (
                  <p className="f-login__field-error">{children}</p>
                )}
              />
            </div>

            <button type="submit" className="f-login__btn-submit">
              Войти
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
