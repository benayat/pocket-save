const Family = require("../models/familyModel");

const familyAuth = (req, res, next) => {
  const family = req.body.name.split(" ")[1];
  const result = Family.findOne({ familyName: family });
  if (!result) {
    throw new Error("no such family, please try again, or add a new family");
  }
  next();
};
module.exports = familyAuth;
