import { deleteNotification } from '../../store/actions';
import { useSelector, useDispatch } from 'react-redux';
import './Notifications.scss';

export const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.notificationsReducer.toasts,
  );
  return notifications.length ? (
    <div className="b-notifications">
      {notifications.map((toast) => (
        <div
          key={toast.id}
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
              dispatch(deleteNotification(toast.id));
            }}
          >
            X
          </button>
        </div>
      ))}
    </div>
  ) : null;
};
