import { NavLinks } from '../NavLinks/NavLinks';
import './Navigation.scss';

export const Navigation = ({
  handleLogout,
  setIsLoginFormVisible,
  setIsRegFormVisible,
}) => {
  return (
    <nav className="header__nav">
      <NavLinks
        handleLogout={handleLogout}
        setIsLoginFormVisible={setIsLoginFormVisible}
        setIsRegFormVisible={setIsRegFormVisible}
      />
    </nav>
  );
};
