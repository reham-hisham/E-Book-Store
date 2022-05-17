const route = require("express").Router();
const ViwerController = require("../app/controllers/Viewer.Controller");
route.get("/showProducts", ViwerController.showProducts);
route.get("/showProduct/:id", ViwerController.showProduct);
route.get(
  "/showProductByCategory/:category",
  ViwerController.showProductByCategory
);
route.get("/sortProducts", ViwerController.sortProducts);
module.exports= route
