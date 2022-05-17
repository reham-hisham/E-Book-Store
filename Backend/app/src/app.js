const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
require("dotenv").config();
require("../../dataBase/connection");
const path = require("path");

const hbs = require("hbs");

app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "../View/layout"))
app.set("views", path.join(__dirname, "../src/View"));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const imageRoutes = require("../../routes/image.routes");
app.use("/api/image", imageRoutes);
const viwerRoutes = require("../../routes/Viwer.Routes");

app.use("/api/Viwer", viwerRoutes);
const userRoutes = require("../../routes/user.routes");
app.use("/api/user", userRoutes);

const productRoutes = require("../../routes/product.routes");
app.use("/api/product", productRoutes);

const cartRoutes = require("../../routes/cart.routes");
app.use("/api/cart", cartRoutes);

const orderRoutes = require("../../routes/order.routes");
app.use("/api/order", orderRoutes);
app.get("/frontEnd/public/product/:imageName", (req, res) => {
  const path = require("path");
  res.sendFile(
    path.join(
      __dirname,
      `../../frontEnd/public/product/${req.params.imageName}`
    )
  );
});
module.exports = app;
