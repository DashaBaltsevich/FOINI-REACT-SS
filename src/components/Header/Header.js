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
    try {
      await execute();
    } finally {
      dispatch(setAuthState(false));
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  };

  const toggleClass = () => {
    document.querySelector('.burger').classList.toggle('active');
    document.querySelector('.header__nav').classList.toggle('mobile-nav_open');
    document.querySelector('.l-nav').classList.toggle('mobile-list_open');
  };

  const removeClassList = (e) => {
    if (
      e.target.classList.contains('l-nav__link') ||
      e.target.classList.contains('btn-login') ||
      e.target.classList.contains('btn-logout')
    ) {
      document.querySelector('.burger').classList.remove('active');
      document
        .querySelector('.header__nav')
        .classList.remove('mobile-nav_open');
      document.querySelector('.l-nav').classList.remove('mobile-list_open');
    }
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
            <nav className="header__nav" onClick={(e) => removeClassList(e)}>
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
                {isAuthorized ? (
                  <>
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
                    <li className="l-nav__item">
                      <button className="btn-logout" onClick={handleLogout}>
                        Log Out
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="l-nav__item">
                      <button
                        className="btn-login"
                        onClick={() => setIsLoginFormVisible(true)}
                      >
                        Sign in
                      </button>
                    </li>
                    <li className="l-nav__item">
                      <button
                        className="btn-registration"
                        onClick={() => setIsRegFormVisible(true)}
                      >
                        Sign up
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </nav>
            <button
              type="button"
              className="burger"
              onClick={() => toggleClass()}
            >
              <span className="burger__span"></span>
              <span className="burger__span"></span>
              <span className="burger__span"></span>
            </button>
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
