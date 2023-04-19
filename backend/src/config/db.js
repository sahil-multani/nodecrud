
// const dotenv = require("dotenv");
// dotenv.config();
const mongoose = require("mongoose");
const URL = process.env.MONGO_URL;
console.log(process.env.MONGO_URL)
const connect = () => {
    console.log("connecting to db")
  return mongoose.connect(URL);
};



module.exports = connect