
import { Routes, Route, Link } from 'react-router-dom';
import {Main} from './Main';
import {Users} from './Users'
import { Services } from './Services';
import './styles/Header.scss';

export const Header = () => {
    return (
        <div className='header__wrapper'>
            <header className='header'>
                <div className='container'>
                    <div className='header__inner'>
                        <div className='header__logo'>
                            <Link to='/'>
                            <img src='./img/logo.png' className='App-logo' alt='logo' />
                            </Link>
                        </div>
                        <nav className='header__nav'>
                            <ul className='l-nav'>
                            <li className='l-nav__item'>
                                <Link to='/' className='l-nav__link'>Home</Link>
                            </li>
                            <li className='l-nav__item'>
                                <Link to='/services' className='l-nav__link'>Services</Link>
                            </li>
                            <li className='l-nav__item'>
                                <Link to='/users' className='l-nav__link'>Users</Link>
                            </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
            <Routes>
                <Route path='/' element={<Main />}/>
                <Route path='services' element={<Services />} />
                <Route path='users' element={<Users />} />
            </Routes>
        </div>
    )
}