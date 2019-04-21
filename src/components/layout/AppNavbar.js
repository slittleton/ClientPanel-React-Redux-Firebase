import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import {compose} from 'redux';
import { connect }from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

class AppNavbar extends Component {
  state = {
    isAuthenticated: false
  }

  static getDerivedStateFromProps(props, state) {
    const { auth } = props;

    if(auth.uid){
      return { isAuthenticated: true }
    }else {
      return { isAuthenticated: false }
    }
  }

  onLogoutClick = (e) => {
    e.preventDefault();

    const { firebase } = this.props;
    firebase.logout();
  }

  render() {
    const { isAuthenticated } = this.state;
    const { auth } = this.props;
    const { allowRegistration } = this.props.settings;

    return (
      <nav className="navbar navbar-expand-md navbar-dar bg-primary mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand" style={{color: 'white'}}>
            ClientPanel
          </Link>
          <button 
          className="navbar-toggler"
          style={{color:'white'}}
          type="button"
          data-toggle="collapse"
          data-target="#navbarMain"
          >
            <span className="navbar-toggler-icon"><i className="fas fa-bars"></i></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav ml-auto">
              {isAuthenticated ? (
                <li className="nav-item">
                <Link to="/" className="nav-link" style={{color:"white"}}>Dashboard</Link>
                </li>
              ) : null}
            </ul>
              { isAuthenticated ? (
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a href="#!" className="nav-link" style={{color: "white"}}>
                      User: { auth.email }
                    </a>
                  </li>
                  <li className="nav-item">
                    <Link to="/settings" className="nav-link" style={{color:"white"}}>Settings</Link>
                  </li>
                  <li className="nav-item">
                    <a href="#!" 
                      className="nav-link" 
                      onClick={this.onLogoutClick}
                      style={{color:"white"}}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              ) : null }

              {allowRegistration && !isAuthenticated ? (
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to="/login" className="nav-link" style={{color:"white"}}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link" style={{color:"white"}}>
                      Register
                    </Link>
                  </li>
                </ul>
              ) : null}
          </div>
        </div>
      </nav>
    )
  }
}
AppNavbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
}
export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }))
  )(AppNavbar);