import { useState, useEffect } from 'react';
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
  const burger = document.querySelector('.burger');
  const headerNav = document.querySelector('.header__nav');
  const listNav = document.querySelector('.l-nav');

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
    burger.classList.toggle('active');
    headerNav.classList.toggle('mobile-nav_open');
    listNav.classList.toggle('mobile-list_open');
  };

  const removeClassList = (e) => {
    if (
      e.target.classList.contains('l-nav__link') ||
      e.target.classList.contains('btn-login') ||
      e.target.classList.contains('btn-logout')
    ) {
      burger.classList.remove('active');
      headerNav.classList.remove('mobile-nav_open');
      listNav.classList.remove('mobile-list_open');
    }
  };

  useEffect(() => {
    if (burger) {
      burger.addEventListener('click', () => toggleClass());
      headerNav.addEventListener('click', (e) => removeClassList(e));
    }
    return () => {
      if (burger) {
        burger.removeEventListener('click', () => toggleClass());
        headerNav.removeEventListener('click', (e) => removeClassList(e));
      }
    };
  }, [burger]);

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
            <button type="button" className="burger">
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
