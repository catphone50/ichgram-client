const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/i;
const usernameRegex = /^@[a-zA-Z0-9_-]{3,16}$/;

export const validateEmail = (email) => {
  return emailRegex.test(email);
};

export const validateUsername = (username) => {
  return usernameRegex.test(username);
};
