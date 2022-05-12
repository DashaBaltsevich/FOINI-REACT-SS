import { useContext } from 'react';
import { NotificationContext } from '../../contexts';
import { Notification } from './Notification';
import './NotificationContainer.scss';

export const NotificationContainer = () => {
  const {
    state: { toasts },
  } = useContext(NotificationContext);
  return (
    <div className="b-notifications-container">
      {toasts &&
        toasts.map((toast) => (
          <Notification
            id={toast.id}
            key={toast.id}
            type={toast.type}
            message={toast.message}
            color={toast.color}
          />
        ))}
      <p></p>
    </div>
  );
};
