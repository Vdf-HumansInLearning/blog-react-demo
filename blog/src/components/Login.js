import React, { Component } from "react";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  handleChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  render() {
    return (
      <div className="login">
        <div className="login__container">
          <h1 className="login__title">Login to your account</h1>
          {this.props.credentialsError ? (
            <p className="login__error">Incorrect email or password!</p>
          ) : null}
          <form>
            <div className="mb-3 d-flex align-content-center ">
              <i className="icon-user"></i>
              <input
                onChange={this.handleChangeEmail}
                value={this.state.email}
                type="email"
                className="login__input"
                aria-describedby="emailHelp"
                placeholder="Email"
              />
            </div>
            <div className="mb-3 d-flex align-content-center ">
              <i className="icon-lock-open-alt"></i>
              <div className="mb-3 d-flex align-content-center flex-column"></div>
              <input
                onChange={this.handleChangePassword}
                value={this.state.password}
                type="password"
                className="login__input"
                placeholder="Password"
              />
            </div>
            <button
              onClick={(e) =>
                this.props.handleLogin(e, this.state.email, this.state.password)
              }
              type="submit"
              className="login__button"
            >
              Login
            </button>
            <p className="login__recovery">
              Forgot your password?
              <Link to="/not-found" className="login__recovery--link">
                {" "}
                Click here!
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
