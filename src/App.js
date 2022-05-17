import { useAsync } from './hooks';
import { getUserData } from './api/facades';
import { Preloader } from './components/Preloader';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Header,
  Footer,
  Main,
  UserData,
  Services,
  Users,
  PrivateRoute,
  Notifications,
} from './components';
import {
  setUserInformation,
  setAuthState,
  setNotification,
} from './store/actions';
import './App.scss';

function App() {
  const { execute, loading } = useAsync(getUserData, [], [], false);

  const dispatch = useDispatch();
  const isAuthorized = useSelector(
    (state) => state.authenticationReducer.isAuthorized,
  );

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      return;
    }

    (async () => {
      try {
        const data = await execute();
        dispatch(setUserInformation(data?.content));
        dispatch(setAuthState(true));
      } catch (err) {
        return dispatch(
          setNotification(
            'Error',
            `${err?.response?.data?.message}` ||
              `${err?.message}` ||
              'Unknown error!',
          ),
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
      <Notifications />
    </div>
  );
}

export default App;
