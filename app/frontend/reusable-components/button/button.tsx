import React, { MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  type?: "button" | "submit";
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  disabled?: boolean;
}

const baseClasses = "inline-block py-3 px-6 text-white rounded-lg w-full";
const enabledClasses = "bg-[hsla(244,49%,49%,1)] hover:bg-[hsla(244,49%,59%,1)] active:scale-[0.99]";
const disabledClasses = "bg-[hsla(244,49%,49%,0.5)] cursor-not-allowed";

export function Button({ href, children, type = "button", onClick, disabled = false }: Props) {
  const classes = `${baseClasses} ${disabled ? disabledClasses : enabledClasses}`;

  if (href) {
    return (
      <Link to={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
