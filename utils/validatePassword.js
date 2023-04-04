const validatePassword = (password) => {
  try {
    if (password.length < 8) {
      return [false, "Password must contain at least 8 characters."];
    } else if (password.length > 30) {
      return [false, "Password must contain at most 30 characters."];
    } else {
      const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      const isValid = regex.test(password);

      if (isValid) {
        return [true, "Password is valid."];
      } else {
        return [
          false,
          "Password must contain at least one uppercase letter, one lowercase letter and one number."
        ];
      }
    }
  } catch (err) {
    console.log("Error:\n", err);
    return [false, "Something went wrong."];
  }
};

module.exports = validatePassword;
