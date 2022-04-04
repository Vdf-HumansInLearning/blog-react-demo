import { Link } from "react-router-dom";

function NotFound() {
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

export default NotFound;
