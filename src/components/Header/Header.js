import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAsync } from '../../hooks';
import { signOut } from '../../api/facades';
import { setAuthState } from '../../store/actions';
import { ModalWindow } from '../ModalWindow';
import { LoginForm } from '../LoginForm';
import { RegForm } from '../RegForm';
import { Preloader } from '../Preloader';
import { NavBar } from '../NavBar';
import './Header.scss';

export const Header = () => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [isRegFormVisible, setIsRegFormVisible] = useState(false);
  const dispatch = useDispatch();
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
            <NavBar
              handleLogout={handleLogout}
              setIsLoginFormVisible={setIsLoginFormVisible}
              setIsRegFormVisible={setIsRegFormVisible}
            />
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
