import { useAsync } from './hooks';
import { getUserData } from './api/facades';
import { Preloader } from './components/Preloader';
import { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  Header,
  Footer,
  Main,
  UserData,
  Services,
  Users,
  PrivateRoute,
} from './components';
import { AuthenticationContext } from './contexts';
import './App.scss';

function App() {
  const {
    state: { isAuthorized },
    actions: { setUserInformation, setAuthState },
  } = useContext(AuthenticationContext);
  const { execute, loading } = useAsync(getUserData, [], [], false);

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      return;
    }

    (async () => {
      try {
        const data = await execute();

        setUserInformation(data?.content);
        setAuthState(true);
      } catch (err) {
        return alert(
          err?.response?.data?.message || err?.message || 'Unknown error!',
        );
      }
    })();
  }, []);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="services" element={<Services />} />
        <Route path="users" element={<Users />} />
        <Route
          path="/me"
          element={
            <PrivateRoute isAllowed={isAuthorized}>
              <UserData />
            </PrivateRoute>
          }
        />
      </Routes>
      {loading ? <Preloader /> : null}
      <Footer />
    </div>
  );
}

export default App;
