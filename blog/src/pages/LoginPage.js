import React from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
import { useState } from "react";

function LoginPage() {
  const navigate = useNavigate();
  const [credentialsError, setCredentialsError] = useState(false);

  function createCookie(name, value, days) {
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

  const handleLogin = (event, email, password) => {
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
          createCookie("email", `${email}`, 2);
          navigate("/");
        } else {
          setCredentialsError(true);
        }
      })

      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Login handleLogin={handleLogin} credentialsError={credentialsError} />
  );
}

export default LoginPage;
