import React from "react";
import { Component } from "react/cjs/react.production.min";
import "./ToastAlert.css";

class ToastAlert extends Component {
  render() {
    const {
      showSuccessMessage,
      showDeleteMessage,
      isToastShown,
      toastContent,
    } = this.props;
    if (
      (showSuccessMessage && isToastShown) ||
      (showDeleteMessage && isToastShown)
    ) {
      return (
        <div className="static">
          <div
            className={
              showSuccessMessage
                ? "alert alert-success"
                : showDeleteMessage
                ? "alert alert-delete"
                : null
            }
            role="alert"
          >
            {toastContent}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ToastAlert;
