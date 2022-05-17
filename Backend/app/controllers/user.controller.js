const userModel = require("../../dataBase/models/user.model");
const productModel = require("../../dataBase/models/product.model");
const responseHelper = require("../src/helper");

const Icontroller = require("./UsersMainFunctions.Cotroller");
const Order = require("../controllers/order.controller");

class user extends Icontroller {
  
  static addProduct = async (req, res) => {
    try {
      const product = new productModel(req.body);

      await product.save();
      responseHelper.success(product, res);
    } catch (e) {
      responseHelper.fail(e, res);
    }
  };
  static addProductImg = async (req, res) => {
    try {
      const product = await productModel.findById(req.params.id);
      product.image = req.file.path;
      await product.save();
      responseHelper.success(product, res);
    } catch (e) {
      responseHelper.fail(e, res);
    }
  };

  /* static addProductAttribute = async(req, res) => {
    try {
      const product = await productModel.findById(req.params.id);
      product.attributes.push(req.body);
      await product.save();
      responseHelper.success(product, res);
    } catch (e) {
        responseHelper.fail(e, res);
    }
  };
  static addProductAttributeValue = async (req, res) => {
    try {
     
      const product = await productModel.findById(req.params.id);
      const index = product.attributes.findIndex(
        (obj) => obj.attributeName == req.params.attribute
      );
      product.attributes[index].values.push(req.body);
      responseHelper.success(product, res);
    } catch (e) {
        responseHelper.fail(e, res);
    }
  };*/

  static editProduct = async (req, res) => {
    try {
      const product = await productModel.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      await product.save();
      responseHelper.success(product, res);
    } catch (e) {
      responseHelper.fail(e, res);
    }
  };
  static delProduct = async (req, res) => {
    try {
      const product = await productModel.findByIdAndDelete(req.params.id);

      await product.save();
      responseHelper.success(product, res);
    } catch (e) {
      responseHelper.fail(e, res);
    }
  };
}

module.exports = user;
