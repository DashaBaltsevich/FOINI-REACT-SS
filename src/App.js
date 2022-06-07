import { useAsync } from './hooks';
import { getUserData } from './api/facades';
import { Preloader } from './components/Preloader';
import { useEffect, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Header,
  Footer,
  Main,
  Services,
  Users,
  PrivateRoute,
  Notifications,
} from './components';
import {
  setUserInformation,
  setAuthState,
  setNotificationWithTimeout,
} from './store/actions';
import './App.scss';

const UserData = lazy(() => import('./components/UserData'));
const Chat = lazy(() => import('./components/Chat'));

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
          setNotificationWithTimeout(
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
      <Suspense fallback={<div>Loading...</div>}>
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
          <Route
            path="/chat"
            element={
              <PrivateRoute isAllowed={isAuthorized}>
                <Chat />
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>

      {loading ? <Preloader /> : null}
      <Footer />
      <Notifications />
    </div>
  );
}

export default App;
