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
  const { execute, loading } = useAsync(
    getUserData,
    [],
    [],
    false,
  );

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

      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const css = `
    @keyframes appearance {
      to {
        opacity: 1;
      }
    }

    .test {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      position: fixed;
      bottom: 0;
      text-align: center;
      background-color: rgba(11, 255, 0, .1);
      animation: appearance .2s ease-in both;
      opacity: 0;
    }
  `;

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
      {/*<Preloader/>*/}

      <style>
        {css}
      </style>
      { loading ? (
        <div className="test">
          <img src="./img/next-episode.gif" alt="Preloader"/>
        </div>
      ): null }
      <Footer />
    </div>
  )
}

export default App;