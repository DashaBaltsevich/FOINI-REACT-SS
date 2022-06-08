import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUsers } from '../../api/facades';
import { useAsync } from '../../hooks';
import { onFetchUsersSuccess } from '../../store/actions';
import { Preloader } from '../Preloader';
import { setNotificationWithTimeout } from '../../store/actions';
import './Users.scss';

export const Users = () => {
  const { execute, loading } = useAsync(getUsers, [], [], false);
  const users = useSelector((state) => state.usersReducer.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (users.length) {
      return;
    }

    (async () => {
      try {
        const data = await execute();

        if (data?.results) {
          dispatch(onFetchUsersSuccess(data.results));
        }
      } catch (err) {
        dispatch(
          setNotificationWithTimeout(
            'Error',
            `${err?.response?.data?.message}` ||
              `${err?.message}` ||
              `Unknown error!`,
          ),
        );
      }
    })();
  }, [users, onFetchUsersSuccess]);

  return loading ? (
    <Preloader />
  ) : (
    <section className="s-team">
      <div className="container">
        <h2 className="s-team__title">Meet Us</h2>
        {!!users.length && (
          <ul className="l-team">
            {users.map((user) => (
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
        )}
      </div>
    </section>
  );
};
