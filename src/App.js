import { getUserData } from './api/facades';
import { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  Header,
  Footer,
  Main,
  UserData,
  Services,
  Users,
  PrivateRoute,
  Notifications,
} from './components';
import {
  setUserInformation,
  setAuthState,
  setNotificationWithTimeout,
} from './store/actions';
import { connect } from 'react-redux';
import './App.scss';

class AppComponent extends Component {
  async componentDidMount() {
    if (!localStorage.getItem('accessToken')) {
      return;
    }

    try {
      const data = await getUserData();
      this.props.setUserInformation(data?.content);
      this.props.setAuthState(true);
    } catch (err) {
      this.props.setNotificationWithTimeout(
        'Error',
        `${err?.response?.data?.message}` ||
          `${err?.message}` ||
          'Unknown error!',
      );
    }
  }
  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="services" element={<Services />} />
          <Route path="users" element={<Users />} />
          <Route
            path="/me"
            element={
              <PrivateRoute isAllowed={this.props.isAuthorized}>
                <UserData />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
        <Notifications />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthorized: state.authenticationReducer.isAuthorized,
});

const mapDispatchToProps = (dispatch) => ({
  setAuthState: (isAuthorised) => dispatch(setAuthState(isAuthorised)),
  setNotificationWithTimeout: (type, message) =>
    dispatch(setNotificationWithTimeout(type, message)),
  setUserInformation: (userInformation) =>
    dispatch(setUserInformation(userInformation)),
});

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
export default App;
