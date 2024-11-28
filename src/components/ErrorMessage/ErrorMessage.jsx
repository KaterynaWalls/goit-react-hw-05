/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import s from "./ErrorMessage.module.css";

const ErrorMessage = ({ errorType = "default" }) => {
  const errorConfig = {
    not_found: {
      message: "Nothing was found. Please try a different query.",
      className: s.notFound,
    },
    network: {
      message:
        "Network issues detected. Please check your internet connection and try again.",
      className: s.networkError,
    },
    server: {
      message:
        "A server error occurred. We are working to fix it. Please try again later.",
      className: s.serverError,
    },
    default: {
      message: "Something went wrong. Please try again later.",
      className: s.defaultError,
    },
  };

  const { message, className } = errorConfig[errorType] || errorConfig.default;

  return (
    <div className={className}>
      <p>{message}</p>
    </div>
  );
};

ErrorMessage.propTypes = {
  errorType: PropTypes.string,
};

export default ErrorMessage;
