"use client";

import classNames from "classnames";
import React from "react";

type ButtonProps = {
  variant?: "primary" | "white" | "gray";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export const Button = ({ variant = "primary", className, children, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "border-[5px] border-[#FFDB7929] border-solid bg-[linear-gradient(0deg,_#FFFFFF,_#FFFFFF),_linear-gradient(90deg,_#FFAF56_0%,_#FFFD82_100%)] rounded-[16px] text-black"
      )}
    ></button>
  );
};
