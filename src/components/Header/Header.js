import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { httpClient } from '../../api/httpClient';
import { AuthenticationContext } from '../../contexts';
import { ModalWindow, LoginForm, RegForm } from '..';
import './Header.scss';

export const Header = () => {
    const setActive = ({ isActive }) => (isActive ? 'l-nav__link-active l-nav__link' : 'l-nav__link');
    const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
    const [isRegFormVisible, setIsRegFormVisible] = useState(false);
    const { state: { isAuthorized }, actions: { setAuthState } } = useContext(AuthenticationContext);

    const handleLogout = () => {
        httpClient.post(`sign-out`, {})
            .finally(() => {
                setAuthState(false);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
            })
    };

    return (
        <>
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
                                    <NavLink to="/" className={setActive}>Home</NavLink>
                                </li>
                                <li className="l-nav__item">
                                    <NavLink to='/services' className={setActive}>Services</NavLink>
                                </li>
                                <li className="l-nav__item">
                                    <NavLink to="/users" className={setActive}>Users</NavLink>
                                </li>
                            </ul>
                        </nav>

                        {isAuthorized ?
                          (<>
                                <NavLink to="/me" className={setActive}>My account</NavLink>
                                <button className="btn-login" onClick={handleLogout}>Log Out</button>
                            </>
                          )
                          :
                          (<div className="btn-login__wrapper">
                                <button className="btn-login" onClick={() => setIsLoginFormVisible(true)}>
                                    Sign in
                                </button>
                                <button className="btn-login" onClick={() => setIsRegFormVisible(true)}>
                                    Sign up
                                </button>
                            </div>
                          )
                        }
                    </div>
                </div>
            </header>

            {isLoginFormVisible &&
                <ModalWindow onClose={()=>{setIsLoginFormVisible(false)}}>
                    <LoginForm setIsLoginFormVisible={setIsLoginFormVisible} />
                </ModalWindow>
            }
            {isRegFormVisible &&
                <ModalWindow onClose={()=>{setIsRegFormVisible(false)}}>
                    <RegForm setIsRegFormVisible={setIsRegFormVisible}/>
                </ModalWindow>
            }
        </>
    )
}