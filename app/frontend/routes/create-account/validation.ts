import zxcvbn from "zxcvbn-typescript";

export const validateUsername = (username: string): string => {
  if (username.length < 10) {
    return "Username is too short (minimum is 10 characters).";
  }
  
  if (username.length > 50) {
    return "Username is too long (maximum is 50 characters).";
  }

  return "";
  };
  
export const validatePassword = (password: string): string => {
  if (password.length < 20) {
    return "Password is too short (minimum is 20 characters).";
  }

  if (password.length > 50) {
    return "Password is too long (minimum is 50 characters).";
  }

  if (!/\d/.test(password)) {
    return "Password must contain at least one number.";
  }

  if (!/[a-zA-Z]/.test(password)) {
    return "Password must contain at least one letter.";
  }

  if (zxcvbn(password).score < 2) {
    return "Password quality is weak. Try adding random words and/or special characters.";
  }
  
  return "";
};
  