import React from "react";
import { ThemeContext } from "../App";

export default function ThemeSwitch() {
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme, currentTheme }) => (
        <>
          {theme === "dark" && currentTheme === "dark" ? (
            <div className="theme-switch-box">
              <button
                type="button"
                className="theme-switch"
                onClick={toggleTheme}
              >
                <div className="fas fa-sun round"></div>
              </button>
            </div>
          ) : (
            <div className="theme-switch-box">
              <button
                type="button"
                className="theme-switch"
                onClick={toggleTheme}
              >
                <div className="far fa-moon round"></div>
              </button>
            </div>
          )}
        </>
      )}
    </ThemeContext.Consumer>
  );
}
