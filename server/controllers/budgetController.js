const Budget = require("../models/budgetModel");
// const Family = require("../models/familyModel");
const User = require("../models/userModel");
const updateAllBudgets = async (req, res) => {
  try {
    const familyBudget = Budget.findById(req.family.budget);
    const newBudget = familyBudget.total - familyBudget.balance;
    familyBudget.total = newBudget;
    familyBudget.balance = 0;
    const users = req.family.users;
    for (let user of users) {
      const userBudget = user.budget;
      userBudget.total = familyBudget.total / req.family.users.length;
      userBudget.balance = 0;
      await userBudget.save();
    }
    await familyBudget.save();
    res.status("200").send(familyBudget);
  } catch (e) {
    res.status(400).send(e.message);
  }
};
const toggleBlockLimitUserBudget = async (req, res) => {
  try {
    const budget = await User.findOne({ email: req.params.email }).userBudget;
    let update;
    if (req.header("action") === "toggleBlockUser") {
      const isBlocked = budget.block;
      update = { block: isBlocked };
    } else {
      update = { total: budget.balance + req.body.amount };
    }
    await Budget.findByIdAndUpdate(budget, update);
    const user = await User.findOne({ email: req.params.email });
    res.status("200").send(user);
  } catch (e) {
    res.status("400").send(e.message);
  }
};

module.exports = {
  updateAllBudgets,
  toggleBlockLimitUserBudget,
};
