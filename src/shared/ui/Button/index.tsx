'use client';

import classNames from 'classnames';
import React from 'react';

type ButtonProps = {
  variant?: 'primary' | 'white' | 'gray';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export const Button = ({ className, children, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        'h-[64px] rounded-[16px] bg-[linear-gradient(90deg,_#FFAF56_0%,_#FFFD82_100%)] text-lg font-bold text-black transition-all [outline:_5px_solid_#FFDB7929] hover:brightness-110',
        className,
      )}
    >
      {children}
    </button>
  );
};
