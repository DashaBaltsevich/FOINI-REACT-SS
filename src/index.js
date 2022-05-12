import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { NotificationContextWrapper } from './contexts';
import { NotificationContainer } from './components';
import { UsersContextWrapper, AuthenticationContextWrapper } from './contexts';
import reportWebVitals from './reportWebVitals';
import './index.scss';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NotificationContextWrapper>
        <NotificationContainer />
        <AuthenticationContextWrapper>
          <UsersContextWrapper>
            <App />
          </UsersContextWrapper>
        </AuthenticationContextWrapper>
      </NotificationContextWrapper>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
