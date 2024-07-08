import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { CreateAccount } from "./create-account";
import { getCsrfToken, mapBackendErrors } from "./utils";
import { validateUsername, validatePassword } from "./validation";

jest.mock("./utils");
jest.mock("./validation");

describe("CreateAccount Component", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <CreateAccount />
      </MemoryRouter>
    );

  test("renders form fields correctly", () => {
    renderComponent();

    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Create Account/i })).toBeInTheDocument();
  });

  test("validates username on change", () => {
    (validateUsername as jest.Mock).mockReturnValue("Username is too short");

    renderComponent();

    const usernameInput = screen.getByLabelText(/Username/i);
    fireEvent.change(usernameInput, { target: { value: "user" } });

    expect(validateUsername).toHaveBeenCalledWith("user");
    expect(screen.getByText(/Username is too short/i)).toBeInTheDocument();
  });

  test("validates password on change", () => {
    (validatePassword as jest.Mock).mockReturnValue("Password is too short");

    renderComponent();

    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(passwordInput, { target: { value: "pass" } });

    expect(validatePassword).toHaveBeenCalledWith("pass");
    expect(screen.getByText(/Password is too short/i)).toBeInTheDocument();
  });

  test("disables button when fields are invalid", () => {
    (validateUsername as jest.Mock).mockReturnValue("Username is too short");
    (validatePassword as jest.Mock).mockReturnValue("Password is too short");

    renderComponent();

    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const button = screen.getByRole("button", { name: /Create Account/i });

    fireEvent.change(usernameInput, { target: { value: "user" } });
    fireEvent.change(passwordInput, { target: { value: "pass" } });

    expect(button).toBeDisabled();
  });

  test("calls backend with valid inputs and CSRF token", async () => {
    (validateUsername as jest.Mock).mockReturnValue("");
    (validatePassword as jest.Mock).mockReturnValue("");
    (getCsrfToken as jest.Mock).mockReturnValue("fake-csrf-token");

    window.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;

    const { unmount } = renderComponent();

    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const button = screen.getByRole("button", { name: /Create Account/i });

    fireEvent.change(usernameInput, { target: { value: "validusername" } });
    fireEvent.change(passwordInput, { target: { value: "validpassword123" } });

    const originalLocation = window.location;
    const mockLocation = { ...window.location, href: "" };
    Object.defineProperty(window, "location", {
      configurable: true,
      value: mockLocation,
    });

    fireEvent.click(button);

    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledWith("/api/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": "fake-csrf-token",
        },
        body: JSON.stringify({ user: { username: "validusername", password: "validpassword123" } }),
      });
    });

    expect(window.location.href).toBe("/signup/account-selection");

    Object.defineProperty(window, "location", {
      configurable: true,
      value: originalLocation,
    });
    unmount();
  });

  test("handles backend validation errors", async () => {
    (validateUsername as jest.Mock).mockReturnValue("");
    (validatePassword as jest.Mock).mockReturnValue("");
    (getCsrfToken as jest.Mock).mockReturnValue("fake-csrf-token");
    (mapBackendErrors as jest.Mock).mockReturnValue({
      username: "Backend username error",
      password: "Backend password error",
      server: "",
    });

    window.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ errors: ["Username error", "Password error"] }),
      })
    ) as jest.Mock;

    renderComponent();

    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const button = screen.getByRole("button", { name: /Create Account/i });

    fireEvent.change(usernameInput, { target: { value: "validusername" } });
    fireEvent.change(passwordInput, { target: { value: "validpassword123" } });

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Backend username error/i)).toBeInTheDocument();
      expect(screen.getByText(/Backend password error/i)).toBeInTheDocument();
    });
  });

  test("displays server error on fetch failure", async () => {
    (validateUsername as jest.Mock).mockReturnValue("");
    (validatePassword as jest.Mock).mockReturnValue("");
    (getCsrfToken as jest.Mock).mockReturnValue("fake-csrf-token");

    window.fetch = jest.fn(() => Promise.reject(new Error("Fetch error"))) as jest.Mock;

    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    renderComponent();

    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const button = screen.getByRole("button", { name: /Create Account/i });

    fireEvent.change(usernameInput, { target: { value: "validusername" } });
    fireEvent.change(passwordInput, { target: { value: "ValidAndStrongPassword123" } });

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong. Please try again./i)).toBeInTheDocument();
    });

    consoleErrorSpy.mockRestore();
  });
});
