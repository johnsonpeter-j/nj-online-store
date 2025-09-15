const User = require("../models/User.model");

// @desc   Get all users
// @route  GET /users
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// @desc   Get user by ID
// @route  GET /users/:id
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.params.id }).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// @desc   Delete user by ID
// @route  DELETE /users/:id
exports.deleteUserById = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.params.id });

    if (!user) return res.status(404).json({ message: "User not found" });

    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};