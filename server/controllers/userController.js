const User = require("../models/userModel");

const createUser = async (req, res) => {
  try {
    console.log(req);
    console.log("body: ", req.body);
    const user = new User(req.body);

    await user.save();
    res.status("201").send(user);
  } catch (e) {
    console.log(e.message);
    res.status("400").send(e.message);
  }
};

const login = async (req, res) => {
  try {
    console.log("loging in");
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken(user.userType);
    user.token = token;
    await user.save();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e.message);
  }
};
const logout = async (req, res) => {
  try {
    console.log("logging out");
    req.user.token = null;
    await req.user.save();
    res.status("200").send(req.user);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const removeUser = async (req, res) => {
  try {
    const result = User.findByIdAndRemove(req.user._id);
    res.status("201").send(user);
  } catch (e) {
    res.status("400").send(e.message);
  }
};
const removeUserAdmin = (req, res) => {
  try {
    const result = User.findOneAndDelete({ email: req.params.email });
    res.status("200").send(result);
  } catch (e) {
    res.status("400").send(e.message);
  }
};

module.exports = {
  createUser,
  removeUser,
  removeUserAdmin,
  login,
  logout,
  // toggleBlockUser,
};
