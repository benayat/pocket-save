const Family = require("../models/familyModel");

const createFamily = async (req, res) => {
  try {
    const family = new Family(req.body);
    const saveResult = await family.save();
    const result = await Family.findById(saveResult._id);
    res.status("201").send(family);
  } catch (e) {
    console.log(e.message);
    res.status("400").send(e.message);
  }
};
const getFamily = (req, res) => {
  try {
    console.log("trying to get family");
    const result = req.family;
    res.status("200").send(result);
  } catch (e) {
    res.status("400").send(e.message);
  }
};
const removeFamily = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Family.findByIdAndDelete(id);
    res.status("200").send(result);
  } catch (e) {
    res.status("400").send(e.message);
  }
};
module.exports = {
  createFamily,
  getFamily,
  removeFamily,
};
