const route = require("express").Router();
const userController = require("../app/controllers/user.controller");
const auth = require("../middleware/auth");
const upload = require("../middleware/fileUpload");
route.post("/register", userController.register);
route.post("/login", userController.login);
route.get("/logout", auth, userController.logout);
route.get("/me", auth, userController.UserInformation);

route.get(
  "/profile",
  auth,
  upload.single("profile"),
  userController.Showprofile
);

route.post("/profile/edit", auth, userController.Editprofile);

module.exports = route;
/*
common -> show all 
        -> show one 
        -> showProductByCategory
        -> sort 
        -> logout 
        -> me 
        -> profile
        -> edit 
*/
