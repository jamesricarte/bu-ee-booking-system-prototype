import React from "react";

const Input = ({
  type,
  id,
  name,
  value,
  required,
  placeholder,
  onChange,
  width = "w-72",
  additionalClassName,
}) => {
  return (
    <input
      className={`${width} border border-solid border-gray-400 rounded-md p-2 ${additionalClassName}`}
      type={type}
      value={value}
      id={id}
      name={name}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
    />
  );
};

export default Input;
