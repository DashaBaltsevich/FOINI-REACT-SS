import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ModalWindow } from '../ModalWindow/ModalWindow';
import { LoginForm } from '../LoginForm/LoginForm';
import { RegForm } from '../RegForm/RegForm';
import './Header.scss';

export const Header = () => {
    const setActive = ({ isActive }) =>(isActive ? "l-nav__link-active l-nav__link" : "l-nav__link");

    const [isLoginForm, setIsLoginForm] = useState(false);
    const [isReginForm, setIsRegForm] = useState(false);

    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="header__inner">
                        <div className="header__logo">
                            <NavLink to='/'>
                            <img src="./img/logo.png" className="App-logo" alt="logo" />
                            </NavLink>
                        </div>
                        <nav className="header__nav">
                            <ul className="l-nav">
                            <li className="l-nav__item">
                                <NavLink to='/' className={setActive}>Home</NavLink>
                            </li>
                            <li className="l-nav__item">
                                <NavLink to='/services' className={setActive}>Services</NavLink>
                            </li>
                            <li className="l-nav__item">
                                <NavLink to='/users' className={setActive}>Users</NavLink>
                            </li>
                            </ul>
                        </nav>
                        <div className="btn-login__wrapper">
                            <button className="btn-login" onClick={() => {
                                setIsLoginForm(true)
                            }}>Sign in</button>
                            <button className="btn-login" onClick={() => {
                                setIsRegForm(true)
                            }}>Sign up</button>
                        </div>
                        
                    </div>
                </div>
            </header>
            {isLoginForm &&
                <ModalWindow onClose={()=>{setIsLoginForm(false)}}>
                    <LoginForm setIsLoginForm={setIsLoginForm}/>
                </ModalWindow>
            }
            {isReginForm &&
                <ModalWindow onClose={()=>{setIsRegForm(false)}}>
                    <RegForm setIsRegForm={setIsRegForm}/>
                </ModalWindow>
            }
        </>
    )
}