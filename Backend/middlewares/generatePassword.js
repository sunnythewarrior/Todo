const bcrypt = require("bcryptjs");

// Function to generate a hashed password
const generatePassword = async (plainTextPassword) => {
  const saltRounds = 10; // You can adjust the number of salt rounds as needed

  try {
    const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error generating hashed password");
  }
};

// Function to compare a plain text password with a hashed password
const comparePasswords = async (plainTextPassword, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};

// Export the functions
module.exports = {
  generatePassword,
  comparePasswords,
};
