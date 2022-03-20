import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header = ( {children} ) => {
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
                                <NavLink to='/' className="l-nav__link"  style = {({ isActive }) => ({
                                    color: isActive ? 'green' : '',
                                })}>
                                Home
                                </NavLink>
                            </li>
                            <li className="l-nav__item">
                                <NavLink to='/services' className="l-nav__link" style = {({ isActive }) => ({
                                    color: isActive ? 'green' : '',
                                })}>
                                    Services
                                </NavLink>
                            </li>
                            <li className="l-nav__item">
                                <NavLink to='/users' className="l-nav__link" style = {({ isActive }) => ({
                                    color: isActive ? 'green' : '',
                                })}>
                                    Users
                                </NavLink>
                            </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
            {children}
        </>
    )
}