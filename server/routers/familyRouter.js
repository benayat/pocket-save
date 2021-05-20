const express = require("express");
const familyRouter = new express.Router();

const auth = require("../middleware/userAuth");
const {
  createFamily,
  getFamily,
  removeFamily,
} = require("../controllers/familyController");

familyRouter.post("/", createFamily);
familyRouter.get("/", auth, getFamily);
familyRouter.delete("/:id", auth, removeFamily);
module.exports = familyRouter;
