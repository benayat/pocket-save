const mongoose = require("mongoose");

const budgetSchema = mongoose.Schema({
  total: {
    type: Number,
    default: 1000,
    validate(value) {
      value >= 0;
    },
  },
  balance: {
    type: Number,
    validate(value) {
      console.log(this.total);
      if (value > 0) {
        return true;
      } else {
        return value >= -this.total && value < this.total;
      }
    },
    default: 0,
  },
  block: {
    type: Boolean,
    default: false,
  },
  incomeTotal: {
    type: Number,
    default: 0,
  },
});
budgetSchema.set("toJSON", {
  transform: function (doc, ret, opt) {
    delete ret["__v"];
    return ret;
  },
});
const Budget = mongoose.model("budget", budgetSchema);
module.exports = Budget;
