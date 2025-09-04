import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {};
const Input = ({ className, ...restProps }: InputProps) => {
  const inputBaseStyle =
    "px-4 py-2 block border-gray-200 py-2 focus:outline-none border focus:border-none transition-all focus:ring-2 focus:ring-[#07705D]/50 focus:ring-offset-2 rounded-lg";

  return (
    <input className={`${inputBaseStyle} ${className}`} {...restProps}></input>
  );
};

export default Input;
