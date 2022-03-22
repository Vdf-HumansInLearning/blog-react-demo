import React, { useState } from "react";
import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import ThemeSwitch from "./components/ThemeSwitch";
import Navbar from "./components/Navbar";
import DetailsPage from "./pages/DetailsPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import "./icons/css/social.css";
import ProtectedLogin from "./pages/ProtectedLogin";

const defaultValues = {
  theme: "",
  toggleTheme: () => false,
  currentTheme: "",
};

export const ThemeContext = React.createContext({ defaultValues });

function App() {
  const [theme, setTheme] = useState("");
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme) {
    document.body.setAttribute("data-theme", currentTheme);
  }

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
    if (currentTheme === "light") {
      document.body.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, currentTheme }}>
      <ThemeSwitch />
      <Navbar />
      <Routes>
        <Route path="*" element={<Navigate replace to="/not-found" />} />
        <Route path="/not-found" element={<NotFoundPage />}></Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/article" element={<DetailsPage />}>
          <Route path=":id" element={<DetailsPage />} />
        </Route>
        <Route element={<ProtectedLogin />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </ThemeContext.Provider>
  );
}

export default App;
