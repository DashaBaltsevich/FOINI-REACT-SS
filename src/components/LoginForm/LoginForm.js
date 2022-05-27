import { setAuthState, setNotificationWithTimeout } from '../../store/actions';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import { Preloader } from '../Preloader';
import { signIn } from '../../api/facades';
import { useQuery } from 'react-query';
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
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(null);

  const { isLoading } = useQuery(
    formData && ['signIn', formData],
    () => signIn(formData),
    {
      enabled: !!formData,
      retry: false,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        dispatch(setAuthState(true));
        setIsLoginFormVisible(false);
        dispatch(
          setNotificationWithTimeout('Success', 'Authentication successful'),
        );

        localStorage.setItem('accessToken', data?.content.token.accessToken);
        localStorage.setItem('refreshToken', data?.content.token.refreshToken);
      },
      onError: (error) => {
        dispatch(
          setNotificationWithTimeout(
            'Error',
            `${error?.response?.data?.message}` ||
              `${error?.message}` ||
              `Unknown error!`,
          ),
        );
      },
    },
  );

  return (
    <>
      {isLoading && <Preloader />}

      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validateOnBlur={false}
        validationSchema={validationSchema}
        onSubmit={(values) => setFormData(values)}
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
