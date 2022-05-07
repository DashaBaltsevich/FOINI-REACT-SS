import { getUsers } from '../../api/facades';
import { useAsync } from '../../hooks';
import { useEffect, useContext } from 'react';
import { UsersContext } from '../../contexts';
import { Preloader } from '../Preloader';
import './Users.scss';

export const Users = () => {
  const {
    state: { users },
    actions: { onFetchUsersSuccess },
  } = useContext(UsersContext);

  const { execute, loading } = useAsync(getUsers, [], [], false);

  useEffect(() => {
    if (users.length) {
      return;
    }

    (async () => {
      try {
        const data = await execute();

        if (data?.results) {
          onFetchUsersSuccess(data.results);
        }
      } catch (error) {
        throw new Error('Error. No data');
      }
    })();
  }, [users, onFetchUsersSuccess]);

  return loading ? (
    <Preloader />
  ) : (
    <section className="s-team">
      <div className="container">
        <h2 className="s-team__title">Meet Us</h2>
        <ul className="l-team">
          {users.map((user) => (
            <li className="l-team__card" key={user.name.first + user.name.last}>
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
};
