const express = require("express");
require("./db/mongoose");
require("./models/permissions");
const router = require("./routers/indexRouter");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(cors());
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
} else {
  app.use(express.static(path.join(__dirname, "../client/public")));
}
app.use(express.json({ limit: "50mb" }));
app.use(router);

// # use alternate localhost and the port Heroku assigns to $PORT
const host = "0.0.0.0";
const port = process.env.PORT || 5000;
app.listen(port, host, () => {
  console.log("server is up on 5000");
});
