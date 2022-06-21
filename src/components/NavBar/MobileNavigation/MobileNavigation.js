import { useEffect } from 'react';
import { NavLinks } from '../NavLinks/NavLinks';
import './MobileNavigation.scss';

export const MobileNavigation = ({
  handleLogout,
  setIsLoginFormVisible,
  setIsRegFormVisible,
}) => {
  const burger = document.querySelector('.burger'),
    mobileMenu = document.querySelector('.header__nav-mobile');

  const toggleClassList = () => {
    burger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  };

  const removeClassList = (e) => {
    if (
      e.target.classList.contains('l-nav__link') ||
      e.target.classList.contains('btn-login') ||
      e.target.classList.contains('btn-logout')
    ) {
      burger.classList.remove('active');
      mobileMenu.classList.remove('open');
    }
  };

  useEffect(() => {
    if (burger) {
      burger.addEventListener('click', () => {
        toggleClassList();
      });
      mobileMenu.addEventListener('click', (e) => {
        removeClassList(e);
      });
    }
    return () => {
      burger.removeEventListener('click', () => toggleClassList);
      mobileMenu.removeEventListener('click', (e) => removeClassList(e));
    };
  }, [burger, mobileMenu]);

  return (
    <nav className="header__nav-mobile">
      <NavLinks
        handleLogout={handleLogout}
        setIsLoginFormVisible={setIsLoginFormVisible}
        setIsRegFormVisible={setIsRegFormVisible}
      />
    </nav>
  );
};
