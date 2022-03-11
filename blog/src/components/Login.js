import React, { Component } from "react";

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
      <div className="main__container">
        <h1 className="main__title">Log in to your account</h1>
        {this.props.credentialsError ? (
          <p className="error__message">Incorrect email or password!</p>
        ) : null}
        <form>
          <div className="mb-3 d-flex align-content-center justify-content-evenly">
            <i className="icon-user"></i>
            <input
              onChange={this.handleChangeEmail}
              value={this.state.email}
              type="email"
              className="form-control"
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
              className="form-control"
              placeholder="Password"
            />
          </div>
          <button
            onClick={(e) =>
              this.props.handleLogin(e, this.state.email, this.state.password)
            }
            type="submit"
            className="main__btn"
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
