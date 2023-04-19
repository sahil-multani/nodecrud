const productModel = require("../models/product.model");

const createProduct = (body) => {
  return new Promise(async (resolve, reject) => {
    const record = new productModel(body);
    try {
      await record.save();
      return resolve(record);
    } catch (error) {
      console.log(error);
      return reject(error?.message || error);
    }
  });
};

const getProductS = (body, isUser = false) => {
  return new Promise(async (resolve, reject) => {
    let { limit = 10, skip = 0, sort = "", filter = "" } = body;

    let count = await productModel.count();
    let query = {};

    if (filter) {
      let keys = ["name"];

      for (let key of keys) {
        query[key] = { $regex: new RegExp(filter), $options: "i" };
      }
    }
    console.log({ limit, sort, skip, query });
    let records = await productModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort(sort);
    return resolve({
      records,
      count,
      limit,
      skip,
    });
  });
};

const updateProduct = async (body) => {
  return new Promise(async (resolve, reject) => {
    const { id } = body;
    let updated = await productModel.findByIdAndUpdate(id, body, {
      returnOriginal: false,
    });
    console.log(updated);
    return resolve(updated);
  });
};

const deleteProduct = async (id) => {
  return new Promise(async (resolve) => {
    let data = await productModel.findByIdAndDelete(id);
    return resolve(data);
  });
};

module.exports = {
  createProduct,
  getProductS,
  updateProduct,
  deleteProduct
};
