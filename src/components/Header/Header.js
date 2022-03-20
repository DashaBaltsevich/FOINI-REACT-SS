import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header = ( {children} ) => {
    const setActive = ({ isActive }) =>(isActive ? "l-nav__link-active l-nav__link" : "l-nav__link");
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
                    </div>
                </div>
            </header>
            {children}
        </>
    )
}