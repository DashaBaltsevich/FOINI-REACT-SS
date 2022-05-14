import { useContext } from 'react';
import { NotificationsContext } from '../../contexts';
import './Notifications.scss';

export const Notifications = () => {
  const {
    state: { notifications },
    actions: { deleteNotification },
  } = useContext(NotificationsContext);
  return (
    <>
      {notifications &&
        notifications.map((toast) => (
          <div className="b-notifications" key={toast.id}>
            <div
              className="b-notifications__item"
              style={{ backgroundColor: `${toast.color}` }}
            >
              <div>
                <h3 className="b-notifications__item-title">{toast.type}</h3>
                <p>{toast.message}</p>
              </div>
              <button
                className="b-notifications__item-btn-close"
                onClick={() => {
                  deleteNotification(toast.id);
                }}
              >
                X
              </button>
            </div>
          </div>
        ))}
    </>
  );
};
