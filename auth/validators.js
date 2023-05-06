const emailValidator = (email) => {
  if (typeof email !== "string") throw new Error("Email must be a string!");
  return email.includes("@") && email.includes(".");
};
const passwordValidator = (password) => {
  if (typeof password !== "string")
    throw new Error("Password must be a string!");
  return password.length >= 6 && password.length <= 150;
};

const subscriptionValidator = (subscription) => {
  if (typeof subscription !== "string")
    throw new Error("Subscription must be a string!");
  const isValidSubs =
    subscription.includes("pro") ||
    subscription.includes("starter") ||
    subscription.includes("business");
  return isValidSubs;
};
const tokenValidator = (token) => {
  if (typeof token !== "string")
    throw new Error("You are not properly log in!");
  return true;
};

const userValidator = ({ subscription, password, email }) => {
  const isValid =
    subscriptionValidator(subscription) &&
    passwordValidator(password) &&
    emailValidator(email);

  if (!isValid) throw new Error("Invalid user data!");

  return isValid;
};

module.exports = {
  passwordValidator,
  subscriptionValidator,
  tokenValidator,
  emailValidator,
  userValidator,
};
