const route = require("express").Router();
const AdminController = require("../app/controllers/Admin.controller");
const upload = require("../middleware/fileUpload");

const AdminAuth = require("../middleware/AdminAuth");
route.post("/registerAdmin", AdminAuth, AdminController.register);

route.get("/showAllUsers", AdminAuth, AdminController.showAllUsers);
route.get("/logout", AdminAuth, AdminController.logout);
route.get("/me", AdminAuth, AdminController.UserInformation);

route.get(
  "/profile",
  AdminAuth,
  upload.single("profile"),
  AdminController.Showprofile
);

route.post("/profile/edit", AdminAuth, AdminController.Editprofile);
