import React, { ChangeEvent, useState } from "react";
import { IoEyeOutline, IoEyeOffOutline, IoInformationCircleOutline } from "react-icons/io5";
import { Tooltip } from "../tooltip/tooltip";

interface Props {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  isPassword?: boolean;
}

export function Input({ label, value, onChange, error, isPassword = false }: Props) {
  const [hideText, setHideText] = useState<boolean>(true);
  const id = label.replace(/ /gm, "_");

  const onClickIcon = () => {
    setHideText(!hideText);
  };

  const passwordRequirements = [
    "20-50 characters",
    "At least one number",
    "At least one letter",
  ];

  return (
    <div>
      <div className="flex flex-row items-center">
        <label htmlFor={id} className="block text-sm text-slate-500">{label}</label>
        {isPassword && (
          <Tooltip title="Password must contain:" body={passwordRequirements}>
            <IoInformationCircleOutline className="my-auto ml-1 text-slate-500 text-center" data-testid="info-icon"/>
          </Tooltip>
        )}
      </div>
      <div className="flex flex-row">
        <input
          id={id}
          className={`block w-full p-2 pl-0 border-b-2 border-b-solid ${error ? "border-b-red-500" : "border-b-slate-200"} focus:outline-none`}
          value={value}
          onChange={onChange}
          type={isPassword && hideText ? "password" : "text"}
        />
        {isPassword && (
          <div 
            className={`p-3 border-b-2 ${error ? "border-b-red-500" : "border-b-slate-200"}`} 
            onClick={onClickIcon}
            data-testid="password-toggle"
          >
            {hideText ? <IoEyeOutline size="20px" color="gray" /> : <IoEyeOffOutline size="20px" color="gray" />}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  );
}
