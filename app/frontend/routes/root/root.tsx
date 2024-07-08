import React from "react";
import { FlowLayout } from "../../reusable-components/flow-layout/flow-layout.tsx";
import { Card } from "../../reusable-components/card/card";
import { Button } from "../../reusable-components/button/button";

export function Root() {
  return (
    <FlowLayout>
        <Card>
          <div className="flex flex-col gap-6">
            <img src="https://tinyurl.com/4k7vu3r5" alt="Wealthfront logo" className="w-14 h-auto mx-auto" />
            <h1 className="text-2xl font-semibold text-center text-slate-800">Get Started</h1>
          </div>
          <div>
            <p className="mb-5 text-center">Create your account to access all the features:</p>
            <ul className="flex flex-col gap-2 mb-5 text-[hsla(244,49%,49%,1)] items-center list-disc list-inside">
              <li>Track your expenses and income</li>
              <li>Create and manage budgets</li>
              <li>Get personalized financial insights</li>
              <li>Access your account from any device</li>
            </ul>
            <p className="text-center">Join us today and take the first step towards managing your finances efficiently!</p>
          </div>
          <Button onClick={() => window.location.href = "/create-account"}>
            Sign Up
          </Button>
        </Card>
    </FlowLayout>
  );
}
