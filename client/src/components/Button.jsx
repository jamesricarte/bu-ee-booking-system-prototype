import React from "react";

const Button = ({
  children = "button",
  backgroundColor = "bg-green-400",
  hover = "hover:opacity-70",
  type,
  value,
  onClick,
  additionalClassName,
}) => {
  return (
    <button
      className={`${backgroundColor} text-white p-1 rounded-md cursor-pointer ${hover} ${additionalClassName}`}
      type={type}
      value={value}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
