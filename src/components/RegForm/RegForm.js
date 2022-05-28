import { useQuery } from 'react-query';
import { useState } from 'react';
import { signUp } from '../../api/facades';
import { Preloader } from '../Preloader';
import { useDispatch } from 'react-redux';
import { setNotificationWithTimeout } from '../../store/actions';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import './RegForm.scss';

const validationSchema = yup.object({
  firstName: yup.string().defined().required(),
  lastName: yup.string().defined().required(),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required')
    .max(30, 'Are you really sure that your email is that big?'),
  password: yup
    .string()
    .required('Password is required')
    .min(4, 'Must Contain 4 Characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{4,})/,
      'Must Contain One Uppercase, One Lowercase, and One Number',
    ),
});

export const RegForm = ({ setIsRegFormVisible }) => {
  const [formData, setFormData] = useState(null);
  const dispatch = useDispatch();

  const onSuccess = (data) => {
    dispatch(
      setNotificationWithTimeout(
        'Success',
        `${data?.message}` || 'Registration succeeded!',
      ),
    );
    setIsRegFormVisible(false);
  };

  const onError = (error) => {
    dispatch(
      setNotificationWithTimeout(
        'Error',
        `${error?.response?.data?.message}` ||
          `${error?.message}` ||
          `Unknown error!`,
      ),
    );
  };

  const { isLoading } = useQuery('signUp', () => signUp(formData), {
    enabled: !!formData,
    retry: false,
    refetchOnWindowFocus: false,
    onSuccess: onSuccess,
    onError: onError,
  });

  return (
    <>
      {isLoading && <Preloader />}

      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        }}
        validateOnBlur={false}
        validationSchema={validationSchema}
        onSubmit={(values) => setFormData(values)}
      >
        {({ values }) => (
          <Form className="f-registration">
            <div className="f-registration__row">
              <label
                htmlFor="first_name"
                className="f-registration__field-label"
              >
                Имя:
              </label>
              <br />
              <Field
                type="text"
                id="firstName"
                name="firstName"
                className="f-registration__field"
                value={values.firstName}
              />
              <ErrorMessage
                name="firstName"
                component={({ children }) => (
                  <p className="f-registration__field-error">{children}</p>
                )}
              />
            </div>

            <div className="f-registration__row">
              <label
                htmlFor="last_name"
                className="f-registration__field-label"
              >
                Фамилия:
              </label>
              <br />
              <Field
                type="text"
                id="lastName"
                name="lastName"
                className="f-registration__field"
                value={values.lastName}
              />
              <ErrorMessage
                name="lastName"
                component={({ children }) => (
                  <p className="f-registration__field-error">{children}</p>
                )}
              />
            </div>

            <div className="f-registration__row">
              <label htmlFor="email" className="f-registration__field-label">
                Почта:
              </label>
              <br />
              <Field
                type="email"
                id="email"
                name="email"
                className="f-registration__field"
                value={values.email}
              />
              <ErrorMessage
                name="email"
                component={({ children }) => (
                  <p className="f-registration__field-error">{children}</p>
                )}
              />
            </div>

            <div className="f-registration__row">
              <label htmlFor="password" className="f-registration__field-label">
                Пароль:
              </label>
              <br />
              <Field
                type="password"
                id="password"
                name="password"
                className="f-registration__field"
                value={values.password}
              />
              <ErrorMessage
                name="password"
                component={({ children }) => (
                  <p className="f-registration__field-error">{children}</p>
                )}
              />
            </div>

            <button type="submit" className="f-registration__btn-submit">
              Зарегистрироваться
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
