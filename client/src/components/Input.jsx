import React from "react";

const Input = ({
  type,
  id,
  name,
  value,
  required,
  onChange,
  additionalClassName,
}) => {
  return (
    <input
      className={`border border-solid border-gray-500 rounded-md p-1 ${additionalClassName}`}
      type={type}
      value={value}
      id={id}
      name={name}
      required={required}
      onChange={onChange}
    />
  );
};

export default Input;
