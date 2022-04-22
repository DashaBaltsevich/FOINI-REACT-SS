import { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { httpClient } from './api/httpClient';
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

  useEffect(() => {
    if(localStorage.getItem('accessToken')) {
      httpClient.get('user')
            .then((data) => {
                setUserInformation(data?.data.content);
                setAuthState(true);
            })
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