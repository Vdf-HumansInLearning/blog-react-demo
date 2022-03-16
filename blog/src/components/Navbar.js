import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const cookie = document.cookie;

  const clearCookie = (name) => {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  };

  const handleLogout = () => {
    clearCookie("email");
    navigate("/login");
    console.log("i am on the login page");
  };

  const nav = ["home", "reviews", "about"];
  return (
    <>
      <div className="nav">
        {window.location.href.slice(21) !== "/login" ? (
          <ul className="nav__container">
            {nav.map((item, index) => (
              <li key={index} className="nav__item">
                <a href={`/`} className="nav__link">
                  {item}
                </a>
              </li>
            ))}
            {cookie ? (
              <li className="nav__item">
                <a href="/login" className="nav__link" onClick={handleLogout}>
                  logout
                </a>
              </li>
            ) : (
              <li className="nav__item">
                <a href="/" className="nav__link">
                  contact
                </a>
              </li>
            )}
          </ul>
        ) : null}
      </div>
    </>
  );
}
