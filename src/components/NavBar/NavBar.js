import { MobileNavigation } from './MobileNavigation/MobileNavigation';
import { Navigation } from './Navigation/Navigation';
import './NavBar.scss';

export const NavBar = ({
  handleLogout,
  setIsLoginFormVisible,
  setIsRegFormVisible,
}) => {
  return (
    <>
      <Navigation
        handleLogout={handleLogout}
        setIsLoginFormVisible={setIsLoginFormVisible}
        setIsRegFormVisible={setIsRegFormVisible}
      />
      <MobileNavigation
        handleLogout={handleLogout}
        setIsLoginFormVisible={setIsLoginFormVisible}
        setIsRegFormVisible={setIsRegFormVisible}
      />
    </>
  );
};
