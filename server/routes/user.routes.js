const express = require("express");
const router = express.Router();
const { getUsers, getUserById, deleteUserById } = require("../controllers/user.controller");

router.get("/", getUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUserById);

module.exports = router;
