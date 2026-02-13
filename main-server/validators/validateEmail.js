function validateEmail(email) {
  if (!email) {
    return {
      isValid: false,
      error: "Email is required.",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      error: "Please enter a valid email address.",
    };
  }

  return {
    isValid: true,
    error: null,
  };
}

module.exports = {
  validateEmail,
};
