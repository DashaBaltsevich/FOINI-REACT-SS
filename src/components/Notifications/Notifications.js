import { deleteNotification } from '../../store/actions';
import { connect } from 'react-redux';
import './Notifications.scss';
import { Component } from 'react';

class NotificationsComponent extends Component {
  render() {
    return (
      !!this.props.notifications.length && (
        <div className="b-notifications">
          {this.props.notifications.map((toast) => (
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
                  this.props.deleteNotification(toast.id);
                }}
              >
                X
              </button>
            </div>
          ))}
        </div>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  notifications: state.notificationsReducer.toasts,
});

const mapDispatchToProps = (dispatch) => ({
  deleteNotification: (id) => dispatch(deleteNotification(id)),
});

export const Notifications = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationsComponent);
