import React from "react";
import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <div className="w-full h-[80px] text-xl text-slate-800 bg-white flex flex-row justify-between items-center pr-10 pl-10 mb-20">
      <Link to="/" className="flex flex-row gap-1 items-center cursor-pointer">
        <img src="https://tinyurl.com/4k7vu3r5" alt="Wealthfront logo" className="h-5 w-auto"/>
        <h1 className="font-bold text-2xl text-[hsla(244,49%,49%,1)]">Wealthfront</h1>
      </Link>
      <Link to="/logout" reloadDocument className="text-[hsla(244,49%,49%,1)] text-sm hover:text-[hsla(244,49%,59%,1)]">
        <div className="border-2 border-[hsla(244,49%,49%,1)] rounded-lg p-2 pl-4 pr-4 flex hover:border-[hsla(244,49%,59%,1)]">
          Logout
        </div>
      </Link>
    </div>
  );
}
