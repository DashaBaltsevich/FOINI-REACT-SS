import './Chat.scss';
import * as yup from 'yup';
import { Formik, Field, ErrorMessage, Form } from 'formik';

const validationSchema = yup.object({
  text: yup
    .string()
    .required('Comment cannot be empty')
    .max(200, 'Too big comment'),
});

export const Chat = () => {
  const accessToken = localStorage?.accessToken;

  const user = [
    {
      name: 'Dasha',
      img: './img/icon-chat.jpg',
      text: 'textwhrvnoehfnvohrvrerhnowrf',
    },
    {
      name: 'Masha',
      img: './img/icon-chat.jpg',
      text: 'survghbfivfkddddddddd ddddddddddddddddddddddddd ddddddddddddjjjjjjjjjjjjjjjjjjjjjjjjjj jjjjjjjjjjjjouwroghwr',
    },
    {
      name: 'Pasha',
      img: './img/icon-chat.jpg',
      text: 'survghbfivfkddddddddd ddddddddddddddd hwr',
    },
    {
      name: 'Sasha',
      img: './img/icon-chat.jpg',
      text: 'survghbfivfkddddddddd dddddddddddddd',
    },
  ];

  const handleFormSubmit = () => {
    const socket = new WebSocket(
      `wss://infinite-woodland-61407.herokuapp.com/ws/chat?token=${accessToken}`,
    );

    socket.onmessage = (e) => {
      console.log(e);
    };

    socket.onerror = (e) => {
      console.log(e);
    };
  };
  return (
    <section className="s-chat">
      <div className="container">
        <h2 className="s-chat__title">Chat</h2>
        <ul className="l-chat">
          {user.map((item) => (
            <li className="l-chat__item" key={item.name}>
              <div className="l-chat__item-row">
                <img src="./img/icon-chat.jpg" />
                <div className="l-chat__item-text-wrapper">
                  <h3 className="l-chat__item__title">{item.name}</h3>
                  <p className="l-chat__item__text">{item.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <Formik
          initialValues={{
            text: '',
          }}
          validateOnBlur={false}
          validationSchema={validationSchema}
          onSubmit={(values) => handleFormSubmit(values)}
        >
          {({ values }) => (
            <Form className="f-chat">
              <Field
                component="textarea"
                id="text"
                name="text"
                className="f-chat__field"
                value={values.text}
              />
              <ErrorMessage
                name="text"
                component={({ children }) => (
                  <p className="f-chat__field-error">{children}</p>
                )}
              />
              <br />
              <button type="submit" className="f-chat__btn-submit">
                Отправить
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};
