import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Tooltip } from "./tooltip";

describe("Tooltip Component", () => {
  test("renders children correctly", () => {
    render(
      <Tooltip title="Tooltip Title" body={["Item 1", "Item 2"]}>
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByText(/Hover me/i)).toBeInTheDocument();
  });

  test("shows tooltip on hover", () => {
    render(
      <Tooltip title="Tooltip Title" body={["Item 1", "Item 2"]}>
        <button>Hover me</button>
      </Tooltip>
    );
    const button = screen.getByText(/Hover me/i);
    fireEvent.mouseEnter(button);

    const tooltip = screen.getByTestId("tooltip");
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent(/Tooltip Title/i);
    expect(tooltip).toHaveTextContent(/Item 1/i);
    expect(tooltip).toHaveTextContent(/Item 2/i);
  });

  test("hides tooltip on mouse leave", () => {
    render(
      <Tooltip title="Tooltip Title" body={["Item 1", "Item 2"]}>
        <button>Hover me</button>
      </Tooltip>
    );
    const button = screen.getByText(/Hover me/i);
    fireEvent.mouseEnter(button);
    fireEvent.mouseLeave(button);

    const tooltip = screen.queryByTestId("tooltip");
    expect(tooltip).not.toBeInTheDocument();
  });
});
