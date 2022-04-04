import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Main } from './components/Main';
import { UserData } from './components/UserData';
import { Services } from './components/Services';
import { Users } from './components/Users';
import { AuthentificationContext } from './contexts/AuthentificationContext';
import './App.scss';


function App() {

  const {state} = useContext(AuthentificationContext);
  
  const PrivateRoute = ({ children }) => {
    return state.isAuthorised ? children : <Navigate to='/' replace />;
  }

  return (
    <div>
        <Header/>
        <Routes>
              <Route path='/' element={<Main />}/>
              <Route path='services' element={<Services />} />
              <Route path='users' element={<Users />} />
              <Route path='/me' element={<PrivateRoute><UserData /></PrivateRoute>} />
        </Routes>
        <Footer />
    </div>
  )
};

export default App;