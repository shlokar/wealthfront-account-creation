import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Card } from "./card";

describe("Card Component", () => {
  test("renders children correctly", () => {
    render(
      <Card>
        <div>Child Content</div>
      </Card>
    );
    expect(screen.getByText(/Child Content/i)).toBeInTheDocument();
  });

  test("renders title when provided", () => {
    render(
      <Card title="Card Title">
        <div>Child Content</div>
      </Card>
    );
    expect(screen.getByText(/Card Title/i)).toBeInTheDocument();
  });

  test("renders description when provided", () => {
    render(
      <Card description="Card Description">
        <div>Child Content</div>
      </Card>
    );
    expect(screen.getByText(/Card Description/i)).toBeInTheDocument();
  });

  test("does not render title when not provided", () => {
    render(
      <Card>
        <div>Child Content</div>
      </Card>
    );
    expect(screen.queryByText(/Card Title/i)).not.toBeInTheDocument();
  });

  test("does not render description when not provided", () => {
    render(
      <Card>
        <div>Child Content</div>
      </Card>
    );
    expect(screen.queryByText(/Card Description/i)).not.toBeInTheDocument();
  });
});
