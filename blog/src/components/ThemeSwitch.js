// import React, { Component } from "react";

// class ThemeSwitch extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentTheme: localStorage.getItem("theme")
//         ? localStorage.getItem("theme")
//         : null,
//       body: document.body,
//     };
//     this.switchTheme = this.switchTheme.bind(this);
//   }

//   switchTheme(event) {
//     if (event.target.checked) {
//       this.state.body.setAttribute("data-theme", "dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       this.state.body.setAttribute("data-theme", "light");
//       localStorage.setItem("theme", "light");
//     }
//   }

//   componentDidMount() {
//     if (this.state.currentTheme) {
//       this.state.body.setAttribute("data-theme", this.state.currentTheme);
//       if (this.state.currentTheme === "dark") {
//         this.checkInput.checked = true;
//       }
//     }
//   }

//   render() {
//     return (
// <div className="theme-switch-box">
//   <label className="theme-switch" htmlFor="switch">
//     <input
//       type="checkbox"
//       id="switch"
//       onChange={this.switchTheme}
//       ref={(ref) => (this.checkInput = ref)}
//     />
//     <div className="icons">
//       <div className="far fa-moon round"></div>
//       <div className="fas fa-sun round"></div>
//     </div>
//   </label>
// </div>
//     );
//   }
// }

// export default ThemeSwitch;

import React from "react";
import { ThemeContext } from "../App";

export default function ThemeSwitch() {
  // let currentTheme = localStorage.getItem("theme")
  //   ? localStorage.getItem("theme")
  //   : null;

  // if (currentTheme) {
  //   document.body.setAttribute("data-theme", currentTheme);
  //   // if (currentTheme === "dark") {
  //   //   document.getElementById("switch").checked = true;
  //   // }
  // }

  // function switchTheme(event) {
  //   if (event.target.checked) {
  //     document.body.setAttribute("data-theme", "dark");
  //     localStorage.setItem("theme", "dark");
  //   } else {
  //     document.body.setAttribute("data-theme", "light");
  //     localStorage.setItem("theme", "light");
  //   }
  // }

  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <>
          {theme === "light" ? (
            <div className="theme-switch-box">
              <button
                type="button"
                className="theme-switch"
                onClick={toggleTheme}
              >
                <div className="far fa-moon round"></div>
              </button>
            </div>
          ) : (
            <div className="theme-switch-box">
              <button
                type="button"
                className="theme-switch"
                onClick={toggleTheme}
              >
                <div className="fas fa-sun round"></div>
              </button>
            </div>
          )}
        </>
      )}
    </ThemeContext.Consumer>
  );
}
