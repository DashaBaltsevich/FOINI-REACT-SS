import { setAuthState, setNotificationWithTimeout } from '../../store/actions';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import './LoginForm.scss';
import { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../api/facades';

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

class LoginFormComponent extends Component {
  handleFormSubmit = async (values) => {
    try {
      const data = await signIn(values);

      this.props.setAuthState(true);
      this.props.setIsLoginFormState(false);
      this.props.setNotificationWithTimeout(
        'Success',
        'Authentication successful',
      );

      localStorage.setItem('accessToken', data?.content.token.accessToken);
      localStorage.setItem('refreshToken', data?.content.token.refreshToken);
    } catch (err) {
      this.props.setNotificationWithTimeout(
        'Error',
        `${err?.response?.data?.message}` ||
          `${err?.message}` ||
          `Unknown error!`,
      );
    }
  };

  render() {
    return (
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validateOnBlur={false}
        validationSchema={validationSchema}
        onSubmit={(values) => this.handleFormSubmit(values)}
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
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAuthState: (isAuthorised) => dispatch(setAuthState(isAuthorised)),
    setNotificationWithTimeout: (type, message) =>
      dispatch(setNotificationWithTimeout(type, message)),
  };
};

export const LoginForm = connect(null, mapDispatchToProps)(LoginFormComponent);
