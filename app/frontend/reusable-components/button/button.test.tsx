import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "./button";
import { MemoryRouter } from "react-router-dom";

describe("Button Component", () => {
  test("renders button with text", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText(/Click Me/i)).toBeInTheDocument();
  });

  test("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    
    const button = screen.getByText(/Click Me/i);
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalled();
  });

  test("renders as a link when href is provided", () => {
    render(
      <MemoryRouter>
        <Button href="/path">Go to Path</Button>
      </MemoryRouter>
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/path");
  });

  test("renders disabled button", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByText(/Disabled/i);
    expect(button).toBeDisabled();
  });

  test("has correct base and enabled classes", () => {
    render(<Button>Enabled</Button>);
    const button = screen.getByText(/Enabled/i);
    expect(button).toHaveClass("inline-block py-3 px-6 text-white rounded-lg w-full");
    expect(button).toHaveClass("bg-[hsla(244,49%,49%,1)] hover:bg-[hsla(244,49%,59%,1)] active:scale-[0.99]");
  });

  test("has correct disabled classes", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByText(/Disabled/i);
    expect(button).toHaveClass("inline-block py-3 px-6 text-white rounded-lg w-full");
    expect(button).toHaveClass("bg-[hsla(244,49%,49%,0.5)] cursor-not-allowed");
  });
});
