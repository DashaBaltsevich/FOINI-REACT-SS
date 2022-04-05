import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { UsersContextWrapper, AuthenticationContextWrapper } from './contexts';
import reportWebVitals from './reportWebVitals';
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
         <AuthenticationContextWrapper>
           <UsersContextWrapper>
              <App />
           </UsersContextWrapper>
         </AuthenticationContextWrapper>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
