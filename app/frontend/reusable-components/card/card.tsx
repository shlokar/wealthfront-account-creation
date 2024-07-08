import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
  minHeight?: string;
  minWidth?: string;
}

export function Card({ children, title, description, className = "", minHeight = "500px", minWidth = "600px" }: Props) {
  return (
    <section className={`p-10 shadow-card rounded-2xl border border-solid border-slate-200 bg-white ${className}`} style={{ minHeight, minWidth }}>
      {title &&
        <h1 className="text-2xl font-medium m-0 mb-2 text-center text-slate-800">{title}</h1>}
      {description && 
        <p className="text-[hsla(243,30%,13%,.63)] text-center text-base m-0 mb-10">{description}</p>}
      <div className="flex flex-col gap-y-10">
        {children}
      </div>
    </section>
  );
}
