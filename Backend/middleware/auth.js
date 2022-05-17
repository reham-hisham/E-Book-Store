const jwt = require("jsonwebtoken");
const userModel = require("../dataBase/models/user.model");

const auth = async (req, res, next) => {
  try {
    const getToken = req.header("Authorization").replace("Bearer ", "");
    const verify = jwt.verify(getToken, process.env.JWT);
    const data = await userModel.findOne({
      _id: verify._id,
      "tokens.token": getToken,
    });
    if (!data) throw new Error("invalid token");
    
    req.user = data;
    req.token = getToken;
    next();
  } catch (e) {
    res.status(500).send({
      apiStatus: false,
      date: e.message,
      message: req.header("Authorization"),
    });
  }
};
module.exports = auth;
