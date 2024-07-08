import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { FlowLayout } from "./flow-layout";

describe("Nav Bar Component", () => {
  test("renders Wealthfront logo", () => {
    render(
      <MemoryRouter>
        <FlowLayout>
          <div>Child Content</div>
        </FlowLayout>
      </MemoryRouter>
    );
    const logo = screen.getByAltText(/Wealthfront logo/i);
    expect(logo).toBeInTheDocument();
  });

  test("renders Logout link", () => {
    render(
      <MemoryRouter>
        <FlowLayout>
          <div>Child Content</div>
        </FlowLayout>
      </MemoryRouter>
    );
    const logoutLink = screen.getByText(/Logout/i);
    expect(logoutLink).toBeInTheDocument();
  });
});
