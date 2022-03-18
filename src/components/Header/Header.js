import { Link } from 'react-router-dom';
import './Header.scss';

export const Header = ( {children} ) => {
    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="header__inner">
                        <div className="header__logo">
                            <Link to='/'>
                            <img src="./img/logo.png" className="App-logo" alt="logo" />
                            </Link>
                        </div>
                        <nav className="header__nav">
                            <ul className="l-nav">
                            <li className="l-nav__item">
                                <Link to='/' className="l-nav__link">Home</Link>
                            </li>
                            <li className="l-nav__item">
                                <Link to='/services' className="l-nav__link">Services</Link>
                            </li>
                            <li className="l-nav__item">
                                <Link to='/users' className="l-nav__link">Users</Link>
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