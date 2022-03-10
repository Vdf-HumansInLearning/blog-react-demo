import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import DetailsPage from "./pages/DetailsPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ThemeSwitch from "./components/ThemeSwitch";
import ScrollToTop from "./components/ScrollToTop";
import LoginPage from "./pages/LoginPage";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import "./icons/css/social.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeSwitch />
      <Navbar />
      <Routes>
        <Route path="*" element={<Navigate replace to="/not-found" />} />
        <Route path="/not-found" element={<NotFoundPage />}></Route>
        <Route element={<ProtectedRoutes />}>
          {" "}
          <Route path="/" element={<HomePage />} />
        </Route>

        <Route path="article" element={<DetailsPage />}>
          <Route path=":id" element={<DetailsPage test="abcd" />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
