import { getUsers } from '../../api/facades';
import { Preloader } from '../Preloader';
import './Users.scss';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { setNotificationWithTimeout } from '../../store/actions';

export const Users = () => {
  const dispatch = useDispatch();
  const onError = (error) => {
    dispatch(
      setNotificationWithTimeout(
        'Error',
        `${error?.message}` || `Unknown error!`,
      ),
    );
  };
  const { isLoading, data } = useQuery('getUsers', getUsers, {
    staleTime: Infinity,
    onError: onError,
  });

  return isLoading ? (
    <Preloader />
  ) : (
    <section className="s-team">
      <div className="container">
        <h2 className="s-team__title">Meet Us</h2>
        {data?.results && (
          <ul className="l-team">
            {data.results.map((user) => (
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
