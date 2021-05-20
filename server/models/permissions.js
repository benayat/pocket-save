const mongoose = require("mongoose");
const permissionsSchema = new mongoose.Schema({
  userType: {
    type: String,
    enum: ["user", "admin"],
    required: true,
  },
  permissionsActions: [
    {
      type: String,
    },
  ],
  permissionsUrls: [
    {
      type: String,
    },
  ],
});

const Permission = mongoose.model("permissions", permissionsSchema);
const userPermissions = {
  userType: "user",
  permissionsActions: ["signup", "delete", "transaction", "login", "logout"],
  permissionsUrls: [
    "/api/users",
    "/api/users",
    "/api/transactions",
    "/api/users/login",
    "/api/users/logout",
  ],
};
const adminPermissions = {
  userType: "admin",
  permissionsActions: [
    ...userPermissions.permissionsActions,
    "blockUser",
    "adminDelete",
    "plus",
    "delete",
    "update",
    "limit",
    "getFamily",
    "getTransactions",
  ],
  permissionsUrls: [
    ...userPermissions.permissionsUrls,
    "/api/budgets",
    "/api/users",
    "/api/family",
    "/api/family",
    "/api/budget",
    "/api/budgets/limit",
    "/api/family",
    "/api/transactions",
  ],
};
async function load() {
  // console.log("loading");
  const permissions = await Permission.find();
  if (permissions.length === 0) {
    const adminPermission = new Permission(adminPermissions);
    await adminPermission.save();
    const userPermission = new Permission(userPermissions);
    await userPermission.save();
  }
}
load();
module.exports = Permission;
