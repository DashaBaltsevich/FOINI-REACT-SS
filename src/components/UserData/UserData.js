import { getUserData } from '../../api/facades';
import { updateUserData } from '../../api/facades';
import { Component } from 'react';
import {
  setAuthState,
  setUserInformation,
  setNotificationWithTimeout,
} from '../../store/actions';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './UserData.scss';
import { connect } from 'react-redux';

const validationSchema = Yup.object({
  firstName: Yup.string().defined('First Name must be defined'),
  lastName: Yup.string().defined('First Name must be defined'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
    .max(30, 'Are you really sure that your email is that big?'),
  password: Yup.string()
    .required('Password is required')
    .min(4, 'Must be more than 4 characters'),
});

class UserDataComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditingEnable: false,
    };
  }

  async componentDidMount() {
    if (this.props.userInformation !== null) {
      return;
    }

    try {
      const data = await getUserData();
      console.log(data);
      this.props.setUserInformation(data?.content);
    } catch (err) {
      console.dir(err);
      this.props.setAuthState(false);
      alert(err?.response?.data?.message || err?.message || 'Unknown error!');
    }
  }

  async handleEditionFormSubmit(values) {
    try {
      const data = await updateUserData(values);
      this.props.setNotificationWithTimeout('Success', 'Data has been updated');
      this.props.setUserInformation(data?.content);
      this.setState({ isEditingEnable: false });
    } catch (error) {
      this.props.setNotificationWithTimeout(
        'Error',
        `${error?.response?.data?.message}` ||
          `${error?.message}` ||
          `Unknown error!`,
      );
    }
  }

  render() {
    return (
      <div className="s-userdata">
        <div className="container">
          {this.state.isEditingEnable ? (
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => this.handleEditionFormSubmit(values)}
            >
              {({ values }) => (
                <Form className="f-edit-userdata">
                  <div className="f-edit-userdata__row">
                    <label className="f-edit-userdata__field-label">
                      Имя:
                      <Field
                        type="text"
                        name="firstName"
                        className="f-edit-userdata__field"
                        value={values.firstName}
                      />
                    </label>
                    <ErrorMessage
                      name="firstName"
                      component={({ children }) => (
                        <p className="f-edit-userdata__field-error">
                          {children}
                        </p>
                      )}
                    />
                  </div>

                  <div className="f-edit-userdata__row">
                    <label className="f-edit-userdata__field-label">
                      Фамилия:
                      <Field
                        type="text"
                        name="lastName"
                        className="f-edit-userdata__field"
                        value={values.lastName}
                      />
                    </label>
                    <ErrorMessage
                      name="lastName"
                      component={({ children }) => (
                        <p className="f-edit-userdata__field-error">
                          {children}
                        </p>
                      )}
                    />
                  </div>

                  <div className="f-edit-userdata__row">
                    <label className="f-edit-userdata__field-label">
                      Почта:
                      <Field
                        type="email"
                        name="email"
                        className="f-edit-userdata__field"
                        value={values.email}
                      />
                    </label>
                    <ErrorMessage
                      name="email"
                      component={({ children }) => (
                        <p className="f-edit-userdata__field-error">
                          {children}
                        </p>
                      )}
                    />
                  </div>

                  <div className="f-edit-userdata__row">
                    <label className="f-edit-userdata__field-label">
                      Введите пароль:
                      <Field
                        type="password"
                        name="password"
                        className="f-edit-userdata__field"
                        value={values.password}
                      />
                    </label>
                    <ErrorMessage
                      name="password"
                      component={({ children }) => (
                        <p className="f-edit-userdata__field-error">
                          {children}
                        </p>
                      )}
                    />
                  </div>

                  <div>
                    <button
                      className="f-edit-userdata__btn-submit"
                      type="submit"
                    >
                      Сохранить
                    </button>
                    <button
                      className="f-edit-userdata__btn-cancel"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({ isEditingEnable: false });
                      }}
                    >
                      Отмена
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          ) : (
            <>
              <ul className="l-userdata">
                <li className="l-userdata__item">
                  Имя: {this.props.userInformation?.firstName}
                </li>
                <li className="l-userdata__item">
                  Фамилия: {this.props.userInformation?.lastName}
                </li>
                <li className="l-userdata__item">
                  Почта: {this.props.userInformation?.email}
                </li>
              </ul>
              <button
                className="btn-userdata-edit"
                onClick={() => this.setState({ isEditingEnable: true })}
              >
                Редактировать
              </button>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userInformation: state.authenticationReducer.userInformation,
});

const mapDispatchToProps = (dispatch) => ({
  setAuthState: (isAuthorised) => dispatch(setAuthState(isAuthorised)),
  setNotificationWithTimeout: (type, message) =>
    dispatch(setNotificationWithTimeout(type, message)),
  setUserInformation: (userInformation) =>
    dispatch(setUserInformation(userInformation)),
});

export const UserData = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserDataComponent);
