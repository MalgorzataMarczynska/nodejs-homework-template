const User = require("./schemas/user.js");
const listUsers = async () => {
  return User.find();
};

const getUserById = (userId) => {
  return User.findOne({ _id: userId });
};

const updateUser = (userId, body) => {
  return User.findByIdAndUpdate({ _id: userId }, body, {
    new: true,
    runValidators: true,
  });
};

const removeUser = (userId) => {
  return User.findByIdAndRemove({ _id: userId });
};

module.exports = {
  listUsers,
  getUserById,
  updateUser,
  removeUser,
};
