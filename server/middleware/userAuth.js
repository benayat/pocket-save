const jwt = require("jsonwebtoken");
const Family = require("../models/familyModel");
const User = require("../models/userModel");
const Permission = require("../models/permissions");
const urlTrim = require("../utils/helpers");
// in order to reduce security issues, user will only have one available token, so
// only one session is possible at a time.
// another important thing - auth here will be different -
/* 
- I'll add the right permissions to the request itself - and check those on each and every request. 
*/

const jwtverifyUser = (token) => {
  try {
    const decodedUser = jwt.verify(token, "user auth");
    return decodedUser;
  } catch (e) {
    return false;
  }
};
const jwtverifyAdmin = (token) => {
  try {
    const decodedAdmin = jwt.verify(token, "admin auth");
    return decodedAdmin;
  } catch (e) {
    return false;
  }
};

const auth = async (req, res, next) => {
  try {
    console.log("trying auth");
    console.log(req.headers);
    const token = req.header("Authorization").replace("Bearer ", "");
    const decodedUser = jwtverifyUser(token);
    const decodedAdmin = jwtverifyAdmin(token);

    let permissions;
    const user =
      decodedUser &&
      (await User.findOne({
        _id: decodedUser._id,
        token: token,
      }));
    const admin =
      decodedAdmin &&
      (await User.findOne({
        _id: decodedAdmin,
        token: token,
      }));
    console.log("isAdmin", decodedAdmin, "is user:", decodedUser);
    if (!decodedUser && !decodedAdmin) {
      throw new Error("no such user");
    } else if (decodedAdmin && !decodedUser) {
      permissions = await Permission.findOne({ userType: "admin" });
    } else if (decodedUser) {
      permissions = await Permission.findOne({ userType: "user" });
    }

    console.log(permissions);
    const action = req.header("action");
    console.log(action);
    const index = permissions.permissionsActions.indexOf(action);
    console.log(index);
    console.log(req.url);
    const url = urlTrim(req.baseUrl + req.url);
    console.log(url);
    if (index === -1 || permissions.permissionsUrls[index] !== url) {
      throw new Error("insuficient permissions");
    }
    console.log(`decoded user: ${user} and admin: ${admin}`);
    const family = await Family.findOne({
      familyName: decodedUser
        ? user.name.split(" ")[1]
        : admin.name.split(" ")[1],
    });
    req.token = token;
    req.user = decodedUser ? user : admin;
    req.family = family;
    console.log("authenticated successfuly");
    next();
  } catch (e) {
    console.log(e.message);
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
