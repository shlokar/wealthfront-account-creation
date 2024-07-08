import React, { useState } from "react";
import { FlowLayout } from "../../reusable-components/flow-layout/flow-layout.tsx";
import { Card } from "../../reusable-components/card/card";
import { Input } from "../../reusable-components/input/input";
import { Button } from "../../reusable-components/button/button";
import { validateUsername, validatePassword } from "./validation.ts";
import { getCsrfToken, mapBackendErrors } from "./utils.ts";

export function CreateAccount() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "", server: "" });

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      username: validateUsername(e.target.value),
    }));
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: validatePassword(e.target.value),
    }));
  };

  const handleCreateAccount = async () => {
    if (!!errors.username || !!errors.password) return;

    const csrfToken = getCsrfToken();

    try {
      const response = await fetch("/api/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken || "",
        },
        body: JSON.stringify({ user: { username, password } }),
      });

      const data = await response.json();
      if (response.ok) {
        window.location.href = "/signup/account-selection";
      } else {
        console.log("Error:", data.errors.join(", "));
        setErrors(mapBackendErrors(data.errors));
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        server: "Something went wrong. Please try again.",
      }));
    }
  };

  return (
    <FlowLayout>
      <Card >
        <div className="flex flex-col gap-6">
          <img src="https://tinyurl.com/4k7vu3r5" alt="Wealthfront logo" className="w-14 h-auto mx-auto" />
          <h1 className="text-2xl font-semibold text-center text-slate-800">Create New Account</h1>
        </div>
        <Input 
          label="Username" 
          value={username} 
          onChange={onChangeUsername}
          error={errors.username}
        />
        <Input 
          label="Password" 
          value={password} 
          onChange={onChangePassword}
          error={errors.password}
          isPassword
        />
        {errors.server && (
          <p className="text-red-500 text-xs italic">{errors.server}</p>
        )}
        <Button 
          onClick={handleCreateAccount} 
          disabled={!username || !password || !!errors.username || !!errors.password}
        >
          Create Account
        </Button>
      </Card>
    </FlowLayout>
  );
}
