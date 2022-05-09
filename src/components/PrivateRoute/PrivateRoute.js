import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ isAllowed, redirectPath = '/', children }) => {
  return isAllowed ? children : <Navigate to={redirectPath} />;
};
