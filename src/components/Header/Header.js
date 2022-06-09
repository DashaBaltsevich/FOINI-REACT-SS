import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAsync } from '../../hooks';
import { signOut } from '../../api/facades';
import { setAuthState } from '../../store/actions';
import { ModalWindow } from '../ModalWindow';
import { LoginForm } from '../LoginForm';
import { RegForm } from '../RegForm';
import { Preloader } from '../Preloader';
import './Header.scss';

export const Header = () => {
  const setActive = ({ isActive }) =>
    isActive ? 'l-nav__link-active l-nav__link' : 'l-nav__link';
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [isRegFormVisible, setIsRegFormVisible] = useState(false);

  const dispatch = useDispatch();
  const isAuthorized = useSelector(
    (state) => state.authenticationReducer.isAuthorized,
  );

  const { execute, loading } = useAsync(signOut, [], [], false);

  const handleLogout = async () => {
    dispatch(setAuthState(false));
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    await execute();
  };

  return (
    <>
      {loading && <Preloader />}
      <header className="header">
        <div className="container">
          <div className="header__inner">
            <div className="header__logo">
              <NavLink to="/">
                <img src="./img/logo.png" className="App-logo" alt="logo" />
              </NavLink>
            </div>
            <nav className="header__nav">
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
            </nav>

            {isAuthorized ? (
              <>
                <NavLink to="/me" className={setActive}>
                  My account
                </NavLink>
                <NavLink to="/chat" className={setActive}>
                  Chat
                </NavLink>
                <button className="btn-login" onClick={handleLogout}>
                  Log Out
                </button>
              </>
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
          </div>
        </div>
      </header>

      {isLoginFormVisible && (
        <ModalWindow
          onClose={() => {
            setIsLoginFormVisible(false);
          }}
        >
          <LoginForm setIsLoginFormVisible={setIsLoginFormVisible} />
        </ModalWindow>
      )}
      {isRegFormVisible && (
        <ModalWindow
          onClose={() => {
            setIsRegFormVisible(false);
          }}
        >
          <RegForm setIsRegFormVisible={setIsRegFormVisible} />
        </ModalWindow>
      )}
    </>
  );
};
