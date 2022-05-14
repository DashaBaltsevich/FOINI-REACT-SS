import { useContext } from 'react';
import { NotificationsContext } from '../../contexts';
import './Notifications.scss';

export const Notifications = () => {
  const {
    state: { toasts },
    actions: { deleteNotification },
  } = useContext(NotificationsContext);
  return (
    <div className="b-notifications-container">
      {toasts &&
        toasts.map((toast) => (
          <div
            key={toast.id}
            className="b-notification-item"
            style={{ backgroundColor: `${toast.color}` }}
          >
            <div>
              <h3 className="b-notification-item__title">{toast.type}</h3>
              <p>{toast.message}</p>
            </div>
            <button
              className="b-notification-item__btn-close"
              onClick={() => {
                deleteNotification(toast.id);
              }}
            >
              X
            </button>
          </div>
        ))}
      <p></p>
    </div>
  );
};
