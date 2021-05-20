const Transaction = require("../models/transactionsModel");

const createTransaction = async (req, res) => {
  try {
    console.log("starting transaction");
    req.body.ownerBudget = req.user.userBudget;
    req.body.familyBudget = req.family.budget;
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status("201").send(transaction);
  } catch (e) {
    console.log(e.message);
    res.status("400").send(e.message);
  }
};
const getAllTransactions = async (req, res) => {
  try {
    console.log("getting transaction");
    req.body.ownerBudget = req.user.userBudget;
    req.body.familyBudget = req.family.budget;
    const transactions = await Transaction.find();
    res.status("201").send(transactions);
  } catch (e) {
    console.log(e.message);
    res.status("400").send(e.message);
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
};
