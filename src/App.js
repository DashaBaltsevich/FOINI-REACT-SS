import { Routes, Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Main } from './components/Main';
import { Me } from './components/Me';
import { Services } from './components/Services';
import { Users } from './components/Users';
import { AuthentificationContext } from './contexts/AuthentificationContext';
import './App.scss';


function App() {

  const PrivateRoute = ({ children }) => {
    const {state, isAuthorised} = useContext(AuthentificationContext);
    return state.isAuthorised ? children : null;
  }

  return (
    <div>
        <Header/>
        <Routes>
              <Route path='/' element={<Main />}/>
              <Route path='services' element={<Services />} />
              <Route path='users' element={<Users />} />
              <Route path='/me' element={<PrivateRoute><Me /></PrivateRoute>} />
        </Routes>
        <Footer />
    </div>
  )
};

export default App;