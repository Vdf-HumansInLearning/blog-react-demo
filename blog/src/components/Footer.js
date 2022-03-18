import React from "react";

export default function Footer({
  handleNext,
  handlePrevious,
  isNext,
  isPrevious,
}) {
  return (
    <>
      <footer className="footer footer__link--next">
        {isNext ? (
          <button className="footer__link" onClick={handleNext}>
            next
          </button>
        ) : (
          <span></span>
        )}
        {isPrevious ? (
          <button
            className="footer__link footer__link--previous"
            onClick={handlePrevious}
          >
            previous
          </button>
        ) : (
          <span></span>
        )}
      </footer>
    </>
  );
}
