import React from "react";
import { Component } from "react/cjs/react.production.min";
import "./SuccessAlert.css";

class SuccessAlert extends Component {
  render() {
    // const { showSuccessMessage, isToastShown, toastContent } = this.props;
    if (this.props.showSuccessMessage && this.props.isToastShown) {
      return (
        <div className="static">
          <div className="alert alert-success" role="alert">
            {this.props.toastContent}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default SuccessAlert;
