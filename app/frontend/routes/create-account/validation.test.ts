import { validateUsername, validatePassword } from "./validation";
import zxcvbn from "zxcvbn-typescript";

jest.mock("zxcvbn-typescript");

describe("validateUsername", () => {
  test("returns error for too short username", () => {
    const result = validateUsername("short");
    expect(result).toBe("Username is too short (minimum is 10 characters).");
  });

  test("returns error for too long username", () => {
    const result = validateUsername("a".repeat(51));
    expect(result).toBe("Username is too long (maximum is 50 characters).");
  });

  test("returns empty string for valid username", () => {
    const result = validateUsername("validusername");
    expect(result).toBe("");
  });
});

describe("validatePassword", () => {
  beforeEach(() => {
    (zxcvbn as jest.Mock).mockReturnValue({ score: 3 });
  });

  test("returns error for too short password", () => {
    const result = validatePassword("short");
    expect(result).toBe("Password is too short (minimum is 20 characters).");
  });

  test("returns error for too long password", () => {
    const result = validatePassword("a".repeat(51));
    expect(result).toBe("Password is too long (minimum is 50 characters).");
  });

  test("returns error for password without number", () => {
    const result = validatePassword("passwordwithoutnumber");
    expect(result).toBe("Password must contain at least one number.");
  });

  test("returns error for password without letter", () => {
    const result = validatePassword("12345678901234567890");
    expect(result).toBe("Password must contain at least one letter.");
  });

  test("returns error for weak password", () => {
    (zxcvbn as jest.Mock).mockReturnValue({ score: 1 });
    const result = validatePassword("aaaaaaaaaaaaaaaaaaaa1");
    expect(result).toBe("Password quality is weak. Try adding random words and/or special characters.");
  });

  test("returns empty string for valid password", () => {
    const result = validatePassword("SuperDuperExtraStrong!1!");
    expect(result).toBe("");
  });
});
