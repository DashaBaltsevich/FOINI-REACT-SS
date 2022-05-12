import './Notification.scss';
import { useContext } from 'react';
import { NotificationContext } from '../../contexts';

export const Notification = ({ type, message, color, id }) => {
  const {
    actions: { deleteNotification },
  } = useContext(NotificationContext);
  return (
    <>
      <div
        className="b-notification-item"
        style={{ backgroundColor: `${color}` }}
      >
        <div>
          <h3 className="b-notification-item__title">{type}</h3>
          <p>{message}</p>
        </div>
        <button
          className="b-notification-item__btn-close"
          onClick={() => {
            deleteNotification(id);
          }}
        >
          X
        </button>
      </div>
    </>
  );
};
