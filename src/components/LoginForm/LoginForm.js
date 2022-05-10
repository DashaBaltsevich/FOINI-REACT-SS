import { useContext } from 'react';
import { AuthenticationContext } from '../../contexts';
import { useAsync } from '../../hooks';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Preloader } from '../Preloader';
import { signIn } from '../../api/facades';
import './LoginForm.scss';

export const LoginForm = ({ setIsLoginFormVisible }) => {
  const {
    actions: { setAuthState },
  } = useContext(AuthenticationContext);
  const { execute, loading } = useAsync(signIn, [], [], false);
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required')
      .max(30, 'Are you really sure that your email is that big?'),
    password: Yup.string()
      .required('Passowrd is required')
      .min(4, 'Must be more than 4 characters'),
  });

  const handleFormSubmit = async (values) => {
    try {
      const data = await execute(values);

      setAuthState(true);
      setIsLoginFormVisible(false);
      localStorage.setItem('accessToken', data?.content.token.accessToken);
      localStorage.setItem('refreshToken', data?.content.token.refreshToken);
    } catch (err) {
      return alert(
        err?.response?.data?.message || err?.message || 'Unknown error!',
      );
    }
  };

  return (
    <>
      {loading && <Preloader />}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ values }) => (
          <Form className="f-login">
            <label htmlFor="email" className="f-login__field-label">
              Почта:
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="f-login__field"
              value={values.email}
            />
            <ErrorMessage name="password" />

            <label htmlFor="password" className="f-login__field-label">
              Пароль:
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="f-login__field"
            />
            <ErrorMessage name="password" />

            <button type="submit" className="f-login__btn-submit">
              Войти
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
