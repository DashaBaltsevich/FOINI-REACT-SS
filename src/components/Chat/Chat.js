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
  const [userMessages, setUserMessages] = useState([]);
  const [idOfConnection, setIdOfConnection] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [typing, setTyping] = useState('');
  const socket = useRef();
  const messageListEl = useRef();
  const dispatch = useDispatch();
  const typingTimeoutID = useRef();

  const wsReducer = (action) => {
    switch (action.type) {
      case 'INIT':
        setIdOfConnection(action.payload.id);
        setUserMessages(action.payload.chatHistory);
        break;
      case 'NEW_MESSAGE':
        setUserMessages((prevState) => [...prevState, action.payload]);
        break;
      case 'TYPING':
        setTyping(action.payload + ' is typing...');
        clearTimeout(typingTimeoutID.current);
        typingTimeoutID.current = setTimeout(() => {
          setTyping('');
          typingTimeoutID.current = null;
        }, 1000);
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

    return () => {
      socket.current.close();
      clearTimeout(typingTimeoutID.current);
    };
  }, []);

  useEffect(() => {
    messageListEl.current?.lastElementChild.scrollIntoView();
  }, [userMessages]);

  const handleFormSubmit = ({ text }, { resetForm }) => {
    const action = {
      type: 'NEW_MESSAGE',
      payload: text,
    };
    socket.current.send(JSON.stringify(action));
    resetForm();
  };

  const handleInput = () => {
    const action = {
      type: 'TYPING',
      payload: idOfConnection,
    };
    socket.current.send(JSON.stringify(action));
  };

  return (
    <section className="s-chat">
      <div className="container">
        <h2 className="s-chat__title">Chat</h2>
        {userMessages.length ? (
          <ul className="l-chat" ref={messageListEl}>
            {userMessages.map((item) => (
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

        {typing && <p className="s-chat__typing">{typing}</p>}

        <Formik
          initialValues={{
            text: '',
          }}
          validateOnBlur={false}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ values }) => (
            <Form className="f-chat">
              <Field
                component="textarea"
                id="text"
                name="text"
                className="f-chat__field"
                value={values.text}
                onInput={handleInput}
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
