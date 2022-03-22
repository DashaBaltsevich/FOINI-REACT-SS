import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Main } from './components/Main';
import { Services } from './components/Services';
import { Users } from './components/Users';
import { RegForm } from './components/RegForm/RegForm';
import { LoginForm } from './components/LoginForm/LoginForm';
import './App.scss';


function App() {

  const [modalRegState, setModalRegState] = useState(false);
  const [modalLogState, setModalLogState] = useState(false);


  return (
    <div>
        <Header setModalRegState={setModalRegState} setModalLogState={setModalLogState}/>
        <Routes>
              <Route path='/' element={<Main />}/>
              <Route path='services' element={<Services />} />
              <Route path='users' element={<Users />} />
        </Routes>
        {
          modalRegState &&
          <RegForm setModalRegState={setModalRegState}/>
        }
        
        {
          modalLogState &&
          <LoginForm setModalLogState={setModalLogState}/>
        }
        
        <Footer />
    </div>
  )
};

export default App;