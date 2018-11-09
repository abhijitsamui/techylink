import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutuser } from "../../actions/authActions";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutuser();
  };
  render() {
    const { isAuthenticaed, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <div onClick={this.onLogoutClick} className="nav-link">
            <img
              className="rounded-circle"
              style={{ width: "25px", marginRight: "5px" }}
              src={user.avatar}
              alt={user.name}
              title="Use gravatar connected to email"
            />{" "}
            Logout
          </div>
        </li>
      </ul>
    );
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Techylink
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  {" "}
                  Developers
                </Link>
              </li>
            </ul>
            {isAuthenticaed ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutuser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutuser }
)(Navbar);
