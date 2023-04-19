const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  descrpition: { type: String, require: true },
  image: {
    type: String,
    require: true,
  },
  createdBy: { type: ObjectId },
  price: { type: Number, require: true },
  quantity:{ type: Number, require: true },
});

module.exports = mongoose.model("products", productSchema, "product");
