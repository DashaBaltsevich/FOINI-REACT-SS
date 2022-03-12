import { createContext, useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import './App.scss';

export const PersonsContext = createContext(null);

function App() {

  const [persons, setPersons] = useState(null);
  return (
    <div style={styleDiv}>
      <PersonsContext.Provider value = {persons}>
        <Header />
      </PersonsContext.Provider>
      <Footer />
    </div>
      
  );
}

export default App;


const styleDiv = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: 100 + 'vh',
}
