import { useAsync } from './hooks'
import { getUserData } from './api/facades';
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

  const { state: { isAuthorized }, actions: { setUserInformation, setAuthState }} = useContext(AuthenticationContext);
  const { execute, value, error, loading} = useAsync(
    getUserData,
    [],
    [],
    true,
  );

  useEffect(() => {
    if(localStorage.getItem('accessToken')) {

      execute();

      if(value) {
        console.log(value)
        setUserInformation(value?.content);
        setAuthState(true);
      }

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="services" element={<Services />} />
        <Route path="users" element={<Users />} />
        <Route path="/me" element={
          <PrivateRoute isAllowed={isAuthorized}>
            <UserData />
          </PrivateRoute>
        }/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App;