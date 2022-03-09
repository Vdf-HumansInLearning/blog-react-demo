import React from 'react';
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import DetailsPage from "./pages/DetailsPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ThemeSwitch from "./components/ThemeSwitch";
import "./icons/css/social.css"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeSwitch />
      <Navbar />
      <Routes>
        <Route path="*" element={<Navigate replace to="/not-found" />} />
        <Route path="/not-found" element={<NotFoundPage />}></Route>
        <Route path="/" element={<HomePage />} />
        <Route path="article" element={<DetailsPage />}>
          <Route path=":id" element={<DetailsPage test="abcd" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
