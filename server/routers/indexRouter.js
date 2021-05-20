const { Router } = require("express");
const userRouter = require("./userRouter");
const transactionRouter = require("./transactionRouter");
const budgetRouter = require("./budgetRouter");
const familyRouter = require("./familyRouter");

const router = new Router();
router.use("/api/family", familyRouter);
router.use("/api/users", userRouter);
router.use("/api/budgets", budgetRouter);
router.use("/api/transactions", transactionRouter);

module.exports = router;
