import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Main } from './components/Main';
import { Services } from './components/Services';
import { Users } from './components/Users';
import './App.scss';
import { SetUserContext } from './components/UsersContext/UsersContext';


function App() {
  return (
    <div>
        <Header>
          <SetUserContext>
            <Routes>
              <Route path='/' element={<Main />}/>
              <Route path='services' element={<Services />} />
              <Route path='users' element={<Users />} />
            </Routes>
          </SetUserContext>
        </Header>
        <Footer />
    </div>
  )
};

export default App;