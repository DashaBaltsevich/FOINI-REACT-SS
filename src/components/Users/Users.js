import { getUsers } from '../../api/facades';
import { onFetchUsersSuccess } from '../../store/actions';
import { Component } from 'react';
import './Users.scss';
import { connect } from 'react-redux';

class UsersComponent extends Component {
  componentDidMount() {
    if (this.props.users.length) {
      return;
    }
    (async () => {
      try {
        const data = await getUsers();

        if (data?.results) {
          this.props.onFetchUsersSuccess(data.results);
        }
      } catch (error) {
        throw new Error('Error. No data');
      }
    })();
  }

  render() {
    return (
      <section className="s-team">
        <div className="container">
          <h2 className="s-team__title">Meet Us</h2>
          <ul className="l-team">
            {this.props.users.map((user) => (
              <li
                className="l-team__card"
                key={user.name.first + user.name.last}
              >
                <div className="l-team__cell">
                  <img
                    className="l-team__photo"
                    src={user.picture.large}
                    alt={user.name.first + user.name.last}
                  />
                  <div className="l-team__text-wrapper">
                    <h4 className="l-team__name">
                      {user.name.first} {user.name.last}
                    </h4>
                    <p className="l-team__position">Photographer</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.usersReducer.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUsersSuccess: (users) => dispatch(onFetchUsersSuccess(users)),
  };
};

export const Users = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersComponent);
