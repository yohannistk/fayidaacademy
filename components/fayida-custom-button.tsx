import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};
const Button = ({
  variant = "primary",
  children,
  className,
  ...restProps
}: ButtonProps) => {
  const buttonBaseStyle =
    "px-4 py-2 block focus:outline-none font-semibold transition-all cursor-pointer hover:ring-2 hover:ring-offset-2 rounded-lg";
  const variants = {
    primary: "bg-[#07705D] text-white hover:ring-[#07705D]",
    secondary: "",
  };
  return (
    <button
      className={`${buttonBaseStyle} ${variants[variant]} ${className}`}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;
