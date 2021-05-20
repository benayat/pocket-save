const express = require("express");
const auth = require("../middleware/userAuth");
const budgetRouter = new express.Router();

const {
  updateAllBudgets,
  toggleBlockLimitUserBudget,
} = require("../controllers/budgetController");
budgetRouter.post("/", auth, updateAllBudgets);
// budgetRouter.patch("/limit/:email", limitUserBudget);
budgetRouter.patch("/:email", auth, toggleBlockLimitUserBudget);
module.exports = budgetRouter;
