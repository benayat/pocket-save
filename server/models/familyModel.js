const mongoose = require("mongoose");
const Budget = require("./budgetModel");
// const User = require("./userModel");
const familySchema = mongoose.Schema({
  familyName: {
    type: String,
    required: true,
    unique: true,
  },
  budget: {
    type: mongoose.Types.ObjectId,
    default: null,
    ref: "budget",
    autopopulate: true,
  },
  users: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      unique: true,
      ref: "user",
      autopopulate: true,
      default: [],
    },
  ],
});
familySchema.pre("save", async function (next) {
  if (!this.budget) {
    const budget = new Budget({ total: 8000 });
    await budget.save();
    this.budget = budget._id;
  }
  next();
});
// familySchema.pre("remove", async (next) => {
//   const users = this.users;
//   User.deleteMany({
//     _id: { $in: users },
//   });
//   next();
// });
familySchema.set("toJSON", {
  transform: function (doc, ret, opt) {
    delete ret["__v"];
    return ret;
  },
});

familySchema.plugin(require("mongoose-autopopulate"));
const Family = mongoose.model("family", familySchema);
module.exports = Family;
