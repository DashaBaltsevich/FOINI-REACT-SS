import { useEffect, useRef, useState } from 'react';
import { setNotificationWithTimeout } from '../../store/actions';
import './Chat.scss';
import * as yup from 'yup';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { useDispatch } from 'react-redux';

const validationSchema = yup.object({
  text: yup
    .string()
    .required('Comment cannot be empty')
    .max(200, 'Too big comment'),
});

export const Chat = () => {
  const [userMessages, setUserMessages] = useState({ id: null, chat: [] });
  const [isConnected, setIsConnected] = useState(false);
  const socket = useRef();
  const dispatch = useDispatch();

  const scrollToBottom = () => {
    let messages = document.querySelector('.l-chat');
    if (messages && userMessages.chat.length) {
      messages.lastElementChild.scrollIntoView();
    }
  };

  const wsReducer = (action) => {
    switch (action.type) {
      case 'INIT':
        setUserMessages({
          id: action.payload.id,
          chat: action.payload.chatHistory,
        });
        break;
      case 'NEW_MESSAGE':
        setUserMessages((prevState) => {
          return {
            ...prevState,
            chat: [...prevState.chat, action.payload],
          };
        });
        break;
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (socket.current) {
      return;
    }
    socket.current = new WebSocket(
      `wss://infinite-woodland-61407.herokuapp.com/ws/chat?token=${accessToken}`,
    );
    socket.current.onopen = () => {
      console.log('connection');
      setIsConnected(true);
    };
    socket.current.onmessage = (e) => {
      const action = JSON.parse(e.data);
      wsReducer(action);
    };

    socket.current.onerror = () => {
      dispatch(setNotificationWithTimeout('Error', 'No connection.'));
      setIsConnected(false);
    };
  }, []);

  const handleFormSubmit = ({ text }) => {
    const action = {
      type: 'NEW_MESSAGE',
      payload: text,
    };
    socket.current.send(JSON.stringify(action));
    document.querySelector('.f-chat').reset();
    scrollToBottom();
  };

  return (
    <section className="s-chat">
      <div className="container">
        <h2 className="s-chat__title">Chat</h2>
        {userMessages.chat.length ? (
          <ul className="l-chat">
            {userMessages.chat.map((item) => (
              <li className="l-chat__item" key={item.id}>
                <img src={item.author.photo} alt={item.author.name} />
                <div className="l-chat__item-text-wrapper">
                  <h3 className="l-chat__item-title">{item.author.name}</h3>
                  <p className="l-chat__item-text">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <h4 className="s-chat__text">There is no messages yet.</h4>
        )}

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
              <button
                type="submit"
                className="f-chat__btn-submit"
                disabled={!isConnected}
              >
                Отправить
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};
