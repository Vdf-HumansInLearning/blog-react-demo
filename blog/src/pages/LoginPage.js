import React from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";

function LoginPage() {
  const navigate = useNavigate();

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
    let url = "http://localhost:3007/admin";
    let admin = {
      email: email,
      password: password,
    };
    fetch(url, {
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
          //save cookie
          createCookie("email", `${email}`, 2);
          //show toast
          //showToast("Login succesful", "You have been logged in!", "succes");

          navigate("/");
        }
      })

      .catch((error) => {
        console.log(error);
      });
  };
  return (
    // <div className="d-flex">
    <Login handleLogin={handleLogin} />
    // </div>
  );
}

export default LoginPage;
