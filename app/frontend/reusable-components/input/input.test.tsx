import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Input } from "./input";

describe("Input Component", () => {
  test("renders input with label", () => {
    render(<Input label="Username" value="" onChange={() => {}} />);
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
  });

  test("calls onChange handler when text is entered", () => {
    const handleChange = jest.fn();
    render(<Input label="Username" value="" onChange={handleChange} />);
    
    const input = screen.getByLabelText(/Username/i);
    fireEvent.change(input, { target: { value: "new text" } });

    expect(handleChange).toHaveBeenCalled();
  });

  test("displays error message", () => {
    render(<Input label="Username" value="" onChange={() => {}} error="Invalid username" />);
    expect(screen.getByText(/Invalid username/i)).toBeInTheDocument();
  });

  test("toggles password visibility", () => {
    render(<Input label="Password" value="password123" onChange={() => {}} isPassword />);
    
    const input = screen.getByLabelText(/Password/i);
    expect(input).toHaveAttribute("type", "password");

    const toggleButton = screen.getByTestId("password-toggle");
    fireEvent.click(toggleButton);

    expect(input).toHaveAttribute("type", "text");
  });

  test("displays password requirements tooltip on hover", async () => {
    render(<Input label="Password" value="" onChange={() => {}} isPassword />);
    
    const infoIcon = screen.getByTestId("info-icon");
    fireEvent.mouseOver(infoIcon);
    
    const tooltip = screen.getByTestId("tooltip");
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent(/Password must contain:/);
    expect(tooltip).toHaveTextContent(/20-50 characters/);
    expect(tooltip).toHaveTextContent(/At least one number/);
    expect(tooltip).toHaveTextContent(/At least one letter/);
  });
});
