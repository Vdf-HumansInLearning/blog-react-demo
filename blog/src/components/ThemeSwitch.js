import React, { Component } from "react";

class ThemeSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTheme: localStorage.getItem("theme")
        ? localStorage.getItem("theme")
        : null,
      body: document.body,
    };
    this.switchTheme = this.switchTheme.bind(this);
  }

  switchTheme(event) {
    if (event.target.checked) {
      this.state.body.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      this.state.body.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }

  componentDidMount() {
    if (this.state.currentTheme) {
      this.state.body.setAttribute("data-theme", this.state.currentTheme);
      if (this.state.currentTheme === "dark") {
        this.checkInput.checked = true;
      }
    }
  }

  render() {
    return (
      <div className="theme-switch-box">
        <label className="theme-switch" htmlFor="switch">
          <input
            id="switch"
            type="checkbox"
            onChange={this.switchTheme}
            ref={(ref) => (this.checkInput = ref)}
          />
          <div className="icons">
            <div className="far fa-moon round"></div>
            <div className="fas fa-sun round"></div>
          </div>
        </label>
      </div>
    );
  }
}

export default ThemeSwitch;
