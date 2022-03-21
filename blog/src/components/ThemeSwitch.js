import React from "react";
import { ThemeContext } from "../App";

export default function ThemeSwitch() {
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme, currentTheme }) => (
        <div className="theme-switch-box">
          <button
            type="button"
            className="theme-switch"
            onClick={toggleTheme}
          >
            <div className={theme === 'dark' && currentTheme === 'dark'
              ? "fas fa-sun round"
              : "far fa-moon round"}>

            </div>
          </button>
        </div>

      )}
    </ThemeContext.Consumer>
  );
}
