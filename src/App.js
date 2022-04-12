import { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
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
      axios.get('https://infinite-woodland-61407.herokuapp.com/api/v1/user', {
        headers: {Authorization: `Bearer ${localStorage.accessToken}`}})
            .then((data) => {
              console.log(1)
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