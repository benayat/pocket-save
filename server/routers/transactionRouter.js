const express = require("express");
const auth = require("../middleware/userAuth");
const transactionRouter = new express.Router();

const {
  createTransaction,
  getAllTransactions,
} = require("../controllers/transactionController");

transactionRouter.post("/", auth, createTransaction);
transactionRouter.get("/", auth, getAllTransactions);
module.exports = transactionRouter;
//maybe shoeten it and only use user controller here. the less the better.
