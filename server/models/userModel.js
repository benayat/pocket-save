const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const validator = require("validator");
const Budget = require("./budgetModel");
const Family = require("./familyModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate(value) {
      return value.split(" ").length == 2;
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain "password"');
      }
      if (new RegExp(this.name.split(" ")[0]).test(value)) {
        throw new Error("Password cannot contain your name");
      }
    },
  },
  token: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    required: true,
    validator(value) {
      return validator.isEmail(value);
    },
  },
  age: {
    type: Number,
    required: true,
  },
  userType: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  userBudget: {
    type: ObjectId,
    ref: "budget",
    default: null,
    autopopulate: true,
  },
});

// changed to one token only per-user. no multiple sessions allowed for security reasons.

userSchema.methods.generateAuthToken = async function (userType) {
  const user = this;
  // console.log(user);
  const token = jwt.sign(
    { _id: user._id.toString() },
    userType === "user" ? "user auth" : "admin auth"
  );

  user.token = token;
  // console.log("token : ", token);
  await user.save();

  return token;
};
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  // console.log("got user", user);
  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  // console.log(isMatch);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.token;

  return userObject;
};

// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  if (!user.userBudget) {
    const budget = new Budget({ total: 1000 });
    await budget.save();
    user.userBudget = budget._id;
  }

  next();
});
userSchema.statics.checkUserInFamily = async (id) => {
  const check = await Family.findOne({ users: id });
  return check ? true : false;
};

userSchema.post("save", async function () {
  console.log(this.name.split(" ").slice(-1));
  const family = await Family.findOne({
    familyName: this.name.split(" ").slice(-1),
  });
  const check = await User.checkUserInFamily(this._id);
  console.log(check);
  if (check === false) {
    console.log("adding to family");
    family.users.push(this._id);
  }
  // console.log(family.users);
  await family.save();
});
userSchema.set("toJSON", {
  transform: function (doc, ret, opt) {
    delete ret["__v"];
    return ret;
  },
});
userSchema.plugin(require("mongoose-autopopulate"));
const User = mongoose.model("user", userSchema);
module.exports = User;

// palns: make a pre-remove middleware for user - and remove his budget,
// and update the family budget while I'm at it.

// auth complete on server side!
// now to client - need to store the details including tokens inside context or similar, and to check authentication process completely.
// only than I can go to chartjs 2
