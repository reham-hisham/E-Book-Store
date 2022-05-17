const cartModel = require("../../dataBase/models/cart.model");
const productModel = require("../../dataBase/models/product.model");
const responseHelper = require("../src/helper");
class Cart {
  static createCart = async(req, res) => {
    try {
      let cart = await cartModel.findOne({ userId: req.user.id });
      if (!cart) cart = new cartModel({ userId: req.user._id });
      const product = await productModel.findById(req.body.productId);
      //    const cart=await cartModel.findById(req.params.id)
      cart.products.push({
        ...req.body,
        price: product.price,
        image: product.image,
        title: product.title,
      });
      await cart.save();
      responseHelper.success(cart, res);
    } catch (e) {
      responseHelper.fail(e, res);
    }
  };
  // static addInCart=async(req,res)=>{
  //     try{
  //        const cart=await cartModel.findById(req.params.id)
  //        const product=await productModel.findById(req.body.productId)
  //        cart.products.push({...req.body,price:product.price})
  //        await cart.save()
  //        res.send({
  //         apiStatus:true,
  //          data:cart,
  //           message:"success adding in cart"
  //     })

  //     }
  //     catch(e){
  //         res.send({
  //             apiStatus:false,
  //              data:e.message,
  //               message:"error adding in cart"
  //         })
  //     }

  // }
  static delFromCart = async(req, res) => {
    try {
      const cart = await cartModel.findById(req.params.id);
      const index = cart.products.findIndex(
        (obj) => obj.productId == req.params.productId
      );
      cart.products.splice(index, 1);
      await cart.save();
      responseHelper.success(cart, res);
    } catch (e) {
      responseHelper.fail(e, res);
    }
  };
  static editCart = async(req, res) => {
    try {
      const cart = await cartModel.findById(req.params.id);
      const index = cart.products.findIndex(
        (obj) => obj.productId == req.params.productId
      );
      cart.products.splice(index, 1);
      cart.products.push(req.body);
      await cart.save();
      responseHelper.success(cart, res);
    } catch (e) {
      responseHelper.fail(e, res);
    }
  };
  static delAll = async(req, res) => {
    try {
      const cart = await cartModel.findByIdAndDelete(req.params.id);
      await cart.save();
      responseHelper.success(cart, res);
    } catch (e) {
      responseHelper.fail(e, res);
    }
  };
  static showUserCart = async(req, res) => {
    try {
      await req.user.populate("mycarts");
      responseHelper.success(req.user.mycarts, res);
    } catch (e) {
      responseHelper.fail(e, res);
    }
  };
}
module.exports = Cart;
