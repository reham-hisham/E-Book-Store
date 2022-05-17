const userModel = require("../../dataBase/models/user.model");
const productModel = require("../../dataBase/models/product.model");
const responseHelper = require("../src/helper");
const UsersMainFunctions = require("./UsersMainFunctions.Cotroller");

class Admin extends UsersMainFunctions {
  static showAllUsers = async (req, res) => {
    try {
      const users = await userModel.find();
      responseHelper.success(users, res);
    } catch (e) {
      responseHelper.fail(e, res);
    }
  };
  static deleteUser = async (req, res) => {
    try {
      const user = await userModel.findByIdAndDelete(req.id);
      await user.save();
      responseHelper.success(order, res);
    } catch (e) {
      responseHelper.fail(e, res);
    }
  };
}
module.exports = Admin;
