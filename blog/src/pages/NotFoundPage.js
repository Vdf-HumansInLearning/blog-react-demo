import { Component } from "react";
import { Link } from "react-router-dom";

class NotFound extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   currentTheme: "",
    // };
  }

  // componentDidMount() {
  //   const currentTheme = localStorage.getItem("theme")
  //     ? localStorage.getItem("theme")
  //     : null;
  //   this.setState({ currentTheme: currentTheme });
  // }

  render() {
    return (
      <>
        <div className="error__box">
          <div className="error__info">
            <h1 className="error__message">Error 404 - Page not found!</h1>
            <Link to={"/"}>
              <button type="button" className="error__button">
                BACK TO HOMEPAGE
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default NotFound;
