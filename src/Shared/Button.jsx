import { Warning } from "postcss";
import React from "react";
const Button = (props) => {
  const handleWarning = () => {
    if (handleOpenWarning) {
      handleOpenWarning(true);
    } else {
      handleCloseWarning(false);
    }
  };
  const {
    no,
    type,
    disabled,
    children,
    edit,
    warning,
    handleOpenWarning,
    handleCloseWarning,
    danger,
    onClick,
  } = props;
  if (disabled) {
    return (
      <button
        className="btn bg-gray-500 text-white font-bold py-2 px-4 rounded mt-4"
        type={type}
        disabled={true}
      >
        {children}
      </button>
    );
  }
  if (danger) {
    return (
      <button
        className="btn bg-red-500 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={() => {
          handleWarning();
        }}
      >
        {children}
      </button>
    );
  }
  if (no) {
    return (
      <button
        className="btn bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={() => handleCloseWarning()}
      >
        {children}
      </button>
    );
  }
  if (edit) {
    return (
      <button className="btn bg-green-500 text-white font-bold py-2 px-4 rounded mt-4">
        {children}
      </button>
    );
  } else
    return (
      <button
        className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        type={type}
        onClick={onClick}
      >
        {children}
      </button>
    );
};

export default Button;
