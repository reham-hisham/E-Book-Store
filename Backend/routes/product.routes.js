const route = require("express").Router();
const UserController = require("../app/controllers/user.controller");
const auth = require("../middleware/auth");
const AdminAuth = require("../middleware/AdminAuth");
const upload = require("../middleware/fileUpload");
route.post("/addProduct", auth, UserController.addProduct);
route.post(
  "/addProductImg/:id",
  auth,
  upload.single("product"),
  UserController.addProductImg
);

/*route.post(
  "/addProductAttribute/:id",
  auth,
  UserController.addProductAttribute
);
route.post(
  "/addProductAttributeValue/:id/:attribute",
  auth,
  UserController.addProductAttributeValue
);*/
route.post("/editProduct/:id", auth, UserController.editProduct);
route.delete("/delProduct/:id", AdminAuth, UserController.delProduct);

module.exports = route;
