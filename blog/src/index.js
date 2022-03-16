import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import { BrowserRouter } from "react-router-dom";
// import "./App.css";
// import Navbar from "./components/Navbar";
// import DetailsPage from "./pages/DetailsPage";
// import HomePage from "./pages/HomePage";
// import NotFoundPage from "./pages/NotFoundPage";
// // import ThemeSwitch from "./components/ThemeSwitch";
// import LoginPage from "./pages/LoginPage";
// import "./icons/css/social.css";
// import ProtectedLogin from "./pages/ProtectedLogin";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <ThemeContext.Provider value={{ theme, toggleTheme }}> */}
      {/* <ThemeSwitch /> */}
      <App />
      {/* <Navbar />
      <Routes>
        <Route path="*" element={<Navigate replace to="/not-found" />} />
        <Route path="/not-found" element={<NotFoundPage />}></Route>
        <Route path="/" element={<HomePage />} />
        <Route path="article" element={<DetailsPage />}>
          <Route path=":id" element={<DetailsPage test="abcd" />} />
        </Route>
        <Route element={<ProtectedLogin />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes> */}
      {/* </ThemeContext.Provider> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
