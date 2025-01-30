'use client';

import classNames from 'classnames';
import React from 'react';

type ButtonProps = {
  variant?: 'primary' | 'white' | 'gray';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export const Button = ({
  variant = 'primary',
  className,
  children,
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        'rounded-[16px] border-[5px] border-solid border-[#FFDB7929] bg-[linear-gradient(0deg,_#FFFFFF,_#FFFFFF),_linear-gradient(90deg,_#FFAF56_0%,_#FFFD82_100%)] text-black',
        className,
      )}
    >
      {children}
    </button>
  );
};
