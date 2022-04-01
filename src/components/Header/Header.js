import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ModalWindow } from '../ModalWindow/ModalWindow';
import { AuthentificationContext } from '../../contexts/AuthentificationContext';
import { LoginForm } from '../LoginForm/LoginForm';
import { RegForm } from '../RegForm/RegForm';
import './Header.scss';

export const Header = () => {
    const setActive = ({ isActive }) =>(isActive ? "l-nav__link-active l-nav__link" : "l-nav__link");

    const [isLoginForm, setIsLoginForm] = useState(false);
    const [isReginForm, setIsRegForm] = useState(false);

    const {state, isAuthorised} = useContext(AuthentificationContext);


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
                        {!state.isAuthorised ?
                            <div className="btn-login__wrapper">
                                <button className="btn-login" onClick={() => {
                                    setIsLoginForm(true)
                                }}>Sign in</button>
                                <button className="btn-login" onClick={() => {
                                    setIsRegForm(true)
                                }}>Sign up</button>
                            </div>
                            : 
                            <>
                                <NavLink to='/me' className={setActive}>Me</NavLink>
                                <button className="btn-login">Log Out</button>
                            </>
                        }
                        
                    </div>
                </div>
            </header>
            {isLoginForm &&
                <ModalWindow onClose={()=>{setIsLoginForm(false)}}>
                    <LoginForm setIsLoginForm={setIsLoginForm} />
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