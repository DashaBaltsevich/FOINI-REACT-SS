import { useAsync } from '../../hooks';
import { signUp } from '../../api/facades';
import { Preloader } from '../Preloader';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './RegForm.scss';

export const RegForm = ({ setIsRegFormVisible }) => {
  const { execute, loading } = useAsync(signUp, [], [], false);
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().defined().required(),
    lastName: Yup.string().defined().required(),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required')
      .max(30, 'Are you really sure that your email is that big?'),
    password: Yup.string()
      .required('Password is required')
      .min(4, 'Must Contain 4 Characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{4,})/,
        'Must Contain One Uppercase, One Lowercase, and One Number',
      ),
  });

  const handleFormSubmit = async (values) => {
    try {
      const data = await execute(values);

      alert(data?.message || 'Registration succeeded!');
      setIsRegFormVisible(false);
    } catch (error) {
      alert(
        error?.response?.data?.message || error?.message || 'Unknown error!',
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
          <Form className="f-registration">
            <label htmlFor="first_name" className="f-registration__field-label">
              Имя:
            </label>
            <Field
              type="text"
              id="firstName"
              name="firstName"
              className="f-registration__field"
              value={values.firstName}
            />
            <ErrorMessage name="firstName" />

            <label htmlFor="last_name" className="f-registration__field-label">
              Фамилия:
            </label>
            <Field
              type="text"
              id="lastName"
              name="lastName"
              className="f-registration__field"
              value={values.lastName}
            />
            <ErrorMessage name="lastName" />

            <label htmlFor="email" className="f-registration__field-label">
              Почта:
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="f-registration__field"
              value={values.email}
            />
            <ErrorMessage name="email" />

            <label htmlFor="password" className="f-registration__field-label">
              Пароль:
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="f-registration__field"
              value={values.password}
            />
            <ErrorMessage name="password" />

            <button type="submit" className="f-registration__btn-submit">
              Зарегистрироваться
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
