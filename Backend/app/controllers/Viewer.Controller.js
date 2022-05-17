const productModel = require("../../dataBase/models/product.model");

const responseHelper = require("../src/helper");
class Viewer {
  static showProducts = async (req, res) => {
    try {
      const products = await productModel.find();
      res.render("ShowOneBook", {
        pageTitle: "ALL TASKS",
        products,
        isEmpty: products.length == 0 ? true : false,
      });
    } catch (e) {
      responseHelper.fail(e, res);
    }
  };
  static showProduct = async (req, res) => {
    try {
      const product = await productModel.findById(req.params.id);
      responseHelper.success(product, res);
    } catch (e) {
      responseHelper.fail(e, res);
    }
  };

  static showProductByCategory = async (req, res) => {
    try {
      const products = await productModel.find({
        categories: req.params.category,
      });
      responseHelper.success(products, res);
    } catch (e) {
      responseHelper.fail(e, res);
    }
  };

  static sortProducts = async (req, res) => {
    try {
      const products = await productModel
        .find()
        .sort({ createdAt: -1 })
        .limit(4);
      responseHelper.success(products, res);
    } catch (e) {
      responseHelper.fail(e, res);
    }
  };
}
module.exports = Viewer;
