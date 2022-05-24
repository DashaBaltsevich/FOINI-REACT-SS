import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { ModalWindow, LoginForm, RegForm } from '..';
import './Header.scss';
import { connect } from 'react-redux';
import { setAuthState } from '../../store/actions';
import { signOut } from '../../api/facades';

class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginFormVisible: false,
      isRegFormVisible: false,
    };
    this.loginClick = this.loginClick.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.setIsLoginFormState = this.setIsLoginFormState.bind(this);
    this.setIsRegFormVisible = this.setIsRegFormVisible.bind(this);
  }

  loginClick = () => {
    this.setState({ isLoginFormVisible: true });
  };

  async handleLogout() {
    await signOut();
    this.props.setAuthState(false);

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  setIsLoginFormState(newState) {
    this.setState({ isLoginFormVisible: newState });
  }

  setIsRegFormVisible(newState) {
    this.setState({ isRegFormVisible: newState });
  }

  render() {
    const setActive = ({ isActive }) =>
      isActive ? 'l-nav__link-active l-nav__link' : 'l-nav__link';

    const isAuthorized = this.props.isAuthorized;

    return (
      <>
        <header className="header">
          <div className="container">
            <div className="header__inner">
              <div className="header__logo">
                <NavLink to="/">
                  <img src="./img/logo.png" className="App-logo" alt="logo" />
                </NavLink>
              </div>
              <nav className="header__nav">
                <ul className="l-nav">
                  <li className="l-nav__item">
                    <NavLink to="/" className={setActive}>
                      Home
                    </NavLink>
                  </li>
                  <li className="l-nav__item">
                    <NavLink to="/services" className={setActive}>
                      Services
                    </NavLink>
                  </li>
                  <li className="l-nav__item">
                    <NavLink to="/users" className={setActive}>
                      Users
                    </NavLink>
                  </li>
                </ul>
              </nav>

              {isAuthorized ? (
                <>
                  <NavLink to="/me" className={setActive}>
                    My account
                  </NavLink>
                  <button className="btn-login" onClick={this.handleLogout}>
                    Log Out
                  </button>
                </>
              ) : (
                <div className="btn-login__wrapper">
                  <button className="btn-login" onClick={this.loginClick}>
                    Sign in
                  </button>
                  <button
                    className="btn-login"
                    onClick={() => this.setState({ isRegFormVisible: true })}
                  >
                    Sign up
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {this.state.isLoginFormVisible && (
          <ModalWindow
            onClose={() => {
              this.setState({ isLoginFormVisible: false });
            }}
          >
            <LoginForm setIsLoginFormState={this.setIsLoginFormState} />
          </ModalWindow>
        )}
        {this.state.isRegFormVisible && (
          <ModalWindow
            onClose={() => {
              this.setState({ isRegFormVisible: false });
            }}
          >
            <RegForm setIsRegFormVisible={this.setIsRegFormVisible} />
          </ModalWindow>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthorized: state.authenticationReducer.isAuthorized,
});

const mapDispatchToProps = (dispatch) => ({
  setAuthState: (isAuthorised) => dispatch(setAuthState(isAuthorised)),
});

export const Header = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderComponent);
