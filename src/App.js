import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Main } from './components/Main';
import { Services } from './components/Services';
import { Users } from './components/Users';
import './App.scss';


function App() {

  return (
    <div>
        <Header/>
        <Routes>
              <Route path='/' element={<Main />}/>
              <Route path='services' element={<Services />} />
              <Route path='users' element={<Users />} />
        </Routes>
        <Footer />
    </div>
  )
};

export default App;