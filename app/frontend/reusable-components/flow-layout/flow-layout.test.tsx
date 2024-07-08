import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { FlowLayout } from "./flow-layout";

describe("FlowLayout Component", () => {
  test("renders children correctly", () => {
    render(
      <MemoryRouter>
        <FlowLayout>
          <div>Child Content</div>
        </FlowLayout>
      </MemoryRouter>
    );
    expect(screen.getByText(/Child Content/i)).toBeInTheDocument();
  });
});
