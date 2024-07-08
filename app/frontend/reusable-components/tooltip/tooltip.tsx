import React, { ReactNode, useState } from "react";

interface TooltipProps {
  title: string;
  body: string[];
  children: ReactNode;
  minWidth?: string;
  minHeight?: string;
}

export function Tooltip({ title, body, children, minWidth = '200px', minHeight = 'auto' }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div 
          className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2" 
          data-testid="tooltip" 
          style={{ minWidth, minHeight }}
        >
          <div className="bg-[hsla(244,49%,49%,1)] text-white text-sm p-4 rounded-md shadow-lg relative z-10">
            <h3 className="font-bold mb-2">{title}</h3>
            <ul className="list-disc pl-5">
              {body.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-r-[hsla(244,49%,49%,1)] border-t-transparent border-b-transparent"></div>
          </div>
        </div>
      )}
    </div>
  );
}

