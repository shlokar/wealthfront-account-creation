import { mapBackendErrors } from "./utils";

describe("mapBackendErrors", () => {
  test("maps username error correctly", () => {
    const backendErrors = ["Username is too short"];
    const result = mapBackendErrors(backendErrors);
    expect(result).toEqual({ username: "Username is too short", password: "", server: "" });
  });

  test("maps password error correctly", () => {
    const backendErrors = ["Password is too short"];
    const result = mapBackendErrors(backendErrors);
    expect(result).toEqual({ username: "", password: "Password is too short", server: "" });
  });

  test("maps other errors to server error", () => {
    const backendErrors = ["Some other error"];
    const result = mapBackendErrors(backendErrors);
    expect(result).toEqual({ username: "", password: "", server: "Something went wrong. Please try again." });
  });

  test("maps multiple errors correctly", () => {
    const backendErrors = ["Username is too short", "Password is too short"];
    const result = mapBackendErrors(backendErrors);
    expect(result).toEqual({ username: "Username is too short", password: "Password is too short", server: "" });
  });
});
