require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const { SERVER_PORT, SESSION_SECRET } = process.env;
const checkForSession = require("./middleWares/checkForSession");
const { read } = require("./controllers/swagController");
const authController = require("./controllers/authController");
const cartController = require("./controllers/cartController");
const { search } = require("./controllers/searchController");

app.use(
  express.json(),
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET
    // cookie: {
    //   maxAge: 1000 * 60 * 60 * 24 * 7
    // }
  })
);

app.use(express.static(`${__dirname}/../build`));
app.use(checkForSession.check);

app.get("/api/swag", read);
app.post("/api/login", authController.login);
app.post("/api/register", authController.register);
app.post("/api/signout", authController.signout);
app.get("/api/user", authController.getUser);
app.post("/api/cart/checkout", cartController.checkout);
app.post("/api/cart/:id", cartController.add);
app.delete("/api/cart/:id", cartController.remove);
app.get("/api/search", search);

app.listen(SERVER_PORT, () => console.log(`Listening on ${SERVER_PORT}`));
