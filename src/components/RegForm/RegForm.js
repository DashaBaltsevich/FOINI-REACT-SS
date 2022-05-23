import { setNotificationWithTimeout } from '../../store/actions';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import './RegForm.scss';
import { Component } from 'react';
import { connect } from 'react-redux';
import { signUp } from '../../api/facades';

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

class RegFormComponent extends Component {
  handleFormSubmit = async (values) => {
    try {
      const data = await signUp(values);

      this.props.setNotificationWithTimeout(
        'Success',
        `${data?.message}` || 'Registration succeeded!',
      );
      this.props.setIsRegFormVisible(false);
    } catch (error) {
      this.props.setNotificationWithTimeout(
        'Error',
        `${error?.response?.data?.message}` ||
          `${error?.message}` ||
          `Unknown error!`,
      );
    }
  };

  render() {
    return (
      <>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
          }}
          validateOnBlur={false}
          validationSchema={validationSchema}
          onSubmit={(values) => this.handleFormSubmit(values)}
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
                <label
                  htmlFor="password"
                  className="f-registration__field-label"
                >
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setNotificationWithTimeout: (type, message) =>
      dispatch(setNotificationWithTimeout(type, message)),
  };
};

export const RegForm = connect(null, mapDispatchToProps)(RegFormComponent);
