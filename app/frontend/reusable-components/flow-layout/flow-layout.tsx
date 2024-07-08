import React, { ReactNode } from 'react';
import { NavBar } from './nav-bar';

interface Props {
  children: ReactNode;
}

export function FlowLayout({ children }: Props) {
  return (
    <div className="h-full mx-auto max-w-[1400px]">
      <NavBar />
      <div className="flex flex-col items-center">
        {children}
      </div>
    </div>
  );
}
