import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAsync } from '../../hooks';
import { getUserData } from '../../api/facades';
import { updateUserData } from '../../api/facades';
import { Preloader } from '../Preloader';
import {
  setAuthState,
  setUserInformation,
  setNotificationWithTimeout,
} from '../../store/actions';
import './UserData.scss';

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

const UserData = () => {
  const [isEditingEnable, setIsEditingEnable] = useState(false);
  const dispatch = useDispatch();
  const userInformation = useSelector(
    (state) => state.authenticationReducer.userInformation,
  );

  const { execute: getUser, loading: userGetLoading } = useAsync(
    getUserData,
    [],
    [],
    false,
  );
  const { execute: updateUser, loading: userUpdateLoading } = useAsync(
    updateUserData,
    [],
    [],
    false,
  );

  useEffect(() => {
    (async () => {
      if (userInformation !== null) {
        return;
      }

      try {
        const data = await getUser();
        dispatch(setUserInformation(data?.content));
      } catch (err) {
        dispatch(setAuthState(false));
        dispatch(
          setNotificationWithTimeout(
            'Error',
            `${err?.response?.data?.message}` ||
              `${err?.message}` ||
              `Unknown error!`,
          ),
        );
      }
    })();
  }, [getUser]);

  const handleEditionFormSubmit = async (values) => {
    try {
      const data = await updateUser(values);

      dispatch(setNotificationWithTimeout('Success', 'Data has been updated'));
      dispatch(setUserInformation(data?.content));
      setIsEditingEnable(false);
    } catch (error) {
      return dispatch(
        setNotificationWithTimeout(
          'Error',
          `${error?.response?.data?.message}` ||
            `${error?.message}` ||
            `Unknown error!`,
        ),
      );
    }
  };

  return (
    <div className="s-userdata">
      {userGetLoading || userUpdateLoading ? (
        <Preloader />
      ) : (
        <div className="container">
          {isEditingEnable ? (
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => handleEditionFormSubmit(values)}
            >
              {({ values }) => (
                <Form className="f-edit-userdata">
                  <div className="f-edit-userdata__row">
                    <label className="f-edit-userdata__field-label">
                      ??????:
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
                      ??????????????:
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
                      ??????????:
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
                      ?????????????? ????????????:
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
                      ??????????????????
                    </button>
                    <button
                      className="f-edit-userdata__btn-cancel"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsEditingEnable(false);
                      }}
                    >
                      ????????????
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          ) : (
            <>
              <ul className="l-userdata">
                <li className="l-userdata__item">
                  ??????: {userInformation?.firstName}
                </li>
                <li className="l-userdata__item">
                  ??????????????: {userInformation?.lastName}
                </li>
                <li className="l-userdata__item">
                  ??????????: {userInformation?.email}
                </li>
              </ul>
              <button
                className="btn-userdata-edit"
                onClick={() => setIsEditingEnable(true)}
              >
                ??????????????????????????
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserData;
