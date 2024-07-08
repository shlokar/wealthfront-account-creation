export const getCsrfToken = () => {
  const token = document.querySelector("meta[name=\"csrf-token\"]")?.getAttribute("content");
  return token;
};

export const mapBackendErrors = (backendErrors: string[]): { username: string, password: string, server: string } => {
  const errors = { username: "", password: "", server: "" };

  backendErrors.forEach(error => {
    if (error.includes("Username")) {
      errors.username = error;
    } else if (error.includes("Password")) {
      errors.password = error;
    } else {
      errors.server = "Something went wrong. Please try again.";
    }
  });

  return errors;
};
