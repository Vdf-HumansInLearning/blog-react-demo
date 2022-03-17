import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credentialsError: false,
    };
    this.createCookie = this.createCookie.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  createCookie(name, value, days) {
    var date, expires;
    if (days) {
      date = new Date();
      date.setDate(date.getDate() + days);
      expires = "; expires=" + date.toUTCString();
    } else {
      expires = "";
    }
    document.cookie = name + "=" + value + expires;
  }

  handleLogin = (event, email, password) => {
    event.preventDefault();

    let admin = {
      email: email,
      password: password,
    };

    fetch("http://localhost:3007/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(admin),
    })
      .then((res) =>
        res.json().then((data) => ({
          status: res.status,
          body: data,
        }))
      )
      .then((response) => {
        let email = response.body.email;
        if (response.status === 200) {
          this.createCookie("email", `${email}`, 2);
          this.props.navigate("/");
        } else {
          this.setState({ credentialsError: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <Login
        handleLogin={this.handleLogin}
        credentialsError={this.state.credentialsError}
      />
    );
  }
}

const withNavigate = (WrappedComponent) => (props) => {
  const navigate = useNavigate();
  return <WrappedComponent {...props} navigate={navigate} />;
};

export default withNavigate(LoginPage);
