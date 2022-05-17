const orderModel = require("../../dataBase/models/order.model");
const cartModel = require("../../dataBase/models/cart.model");
const responseHelper = require("../src/helper");
const classes = require('extends-classes');

class Order {
  static createOrder = async(req, res) => {
    try {
      const product = await cartModel.findOne({ userId: req.user._id });
      const order = new orderModel({
        userId: req.user._id,
        order: product.products,
        ...req.body,
      });
      await order.calculate();
      await order.save();
      responseHelper.success(order, res);
    } catch (e) {
      responseHelper.fail(e, res);
    }
  };

  static delAll = async(req, res) => {
    try {
      const order = await orderModel.findByIdAndDelete(req.params.id);
      await order.save();
      responseHelper.success(order, res);
    } catch (e) {
      responseHelper.fail(e, res);
    }
  };

  static showUserOrder = async(req, res) => {
    try {
      await req.user.populate("myorders");
      responseHelper.success(req.user.myorders, res);
    } catch (e) {
      responseHelper.fail(e, res);
    }
  };
}
module.exports = Order;
