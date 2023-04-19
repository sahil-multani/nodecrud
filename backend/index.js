const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

app.use("/user", require("./src/routes/user.routes"));
app.use("/product",require("./src/routes/product.route"))
app.use("/image",require("./src/routes/file.routes"))
const connect = require("./src/config/db");

connect().then(() => {
  console.log("database connected");
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`listning on ${PORT}`);
  });
});
