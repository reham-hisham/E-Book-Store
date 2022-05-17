
const userModel = require("../../dataBase/models/user.model");
const productModel = require("../../dataBase/models/product.model");
const responseHelper = require("../src/helper");

 class UsersMainFunctions {
    static login=async(req, res)=>{
        try {
            const user = await userModel.login(req.body.email, req.body.password);
            const token = await user.generateToken();
            responseHelper.success({ user, token }, res);
          } catch (e) {
            responseHelper.fail(e, res);
          }
    }
    static logout = async (req, res) => {
      try {
        req.user.tokens = req.user.tokens.filter(
          (token) => token.token != req.token
        );
        await req.user.save();
        responseHelper.success(req.user, res);
      } catch (e) {
        responseHelper.fail(e, res);
      }
    };
    static register = async (req, res) => {
      try {
        const user = new userModel(req.body);
        await user.save();
        responseHelper.success(user, res);
      } catch (e) {
        responseHelper.fail(e, res);
      }
    };
    static Showprofile = async (req, res) => {
      try {
        req.user.image = req.file.path;
        await req.user.save();
        responseHelper.success(req.user, res);
      } catch (e) {
        responseHelper.fail(e, res);
      }
    };
    
  static Editprofile = async (req, res) => {
    try {
      // await req.user.updateOne(req.body)
      const user = await userModel.findByIdAndUpdate(req.user._id, req.body);

      await user.save();
      responseHelper.success(req.user, res);
    } catch (e) {
      responseHelper.fail(e, res);
    }
  };
  static UserInformation = async (req, res) => {
    res
      .status(200)
      .send({ apiStatus: true, data: req.user, message: "data featched" });
  };

  
}

module.exports = UsersMainFunctions