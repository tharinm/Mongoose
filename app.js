const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("5baa2528563f16379fc8a610")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://tharindumadhushan864:ANByPkfq9r5rNfQv@clusters.r5sddfl.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((result) => {
    User.findOne().then((user) => {
    //check the user already exist or not
      if (!user) {
        const user = new User({
          name: "Tharindu",
          email: "tharind@gmail.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });

    app.listen(3003);
  })
  .catch((err) => {
    console.log(err);
  });
