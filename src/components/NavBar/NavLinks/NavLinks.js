import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const NavLinks = ({
  handleLogout,
  setIsLoginFormVisible,
  setIsRegFormVisible,
}) => {
  const setActive = ({ isActive }) =>
    isActive ? 'l-nav__link-active l-nav__link' : 'l-nav__link';
  const isAuthorized = useSelector(
    (state) => state.authenticationReducer.isAuthorized,
  );
  return (
    <>
      <ul className="l-nav">
        <li className="l-nav__item">
          <NavLink to="/" className={setActive}>
            Home
          </NavLink>
        </li>
        <li className="l-nav__item">
          <NavLink to="/services" className={setActive}>
            Services
          </NavLink>
        </li>
        <li className="l-nav__item">
          <NavLink to="/users" className={setActive}>
            Users
          </NavLink>
        </li>
      </ul>
      {isAuthorized ? (
        <ul className="l-nav">
          <li className="l-nav__item">
            <NavLink to="/me" className={setActive}>
              My account
            </NavLink>
          </li>
          <li className="l-nav__item">
            <NavLink to="/chat" className={setActive}>
              Chat
            </NavLink>
          </li>

          <button className="btn-logout" onClick={handleLogout}>
            Log Out
          </button>
        </ul>
      ) : (
        <div className="btn-login__wrapper">
          <button
            className="btn-login"
            onClick={() => setIsLoginFormVisible(true)}
          >
            Sign in
          </button>
          <button
            className="btn-login"
            onClick={() => setIsRegFormVisible(true)}
          >
            Sign up
          </button>
        </div>
      )}
    </>
  );
};
