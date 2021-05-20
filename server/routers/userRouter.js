const express = require("express");
// const familyAuth = require("../middleware/checkFamily");
const auth = require("../middleware/userAuth");
// const adminAuth = require("../middleware/adminAuth");
const {
  createUser,
  removeUser,
  removeUserAdmin,
  login,
  logout,
} = require("../controllers/userController");

const userRouter = new express.Router();
userRouter.post("/", createUser);
userRouter.post("/login", login);
userRouter.post("/logout", auth, logout);
userRouter.delete("/admin/:email", auth, removeUserAdmin);
userRouter.delete("/", auth, removeUser);

module.exports = userRouter;
