const productService = require("../service/product.service");
const { responseConstants } = require("../constants/responseConstants");

const createProductController = async (req, res) => {
  try {
    let data = await productService.createProduct(req.body);
    return res.send(responseConstants.created(data, "Product created"));
  } catch (error) {
    console.log(error);
    return res.send(responseConstants.hasError(error));
  }
};

const getProductController = async (req, res) => {
  try {
    const data = await productService.getProductS(req.body);

    return res.send(responseConstants.created(data, "get product list"));
  } catch (error) {
    console.log(error);
  }
};

const updateProductController = async (req, res) => {
  try {
    const data = await productService.updateProduct(req.body);
    if (!data) {
      return res.send(responseConstants.notFound("Product not found"));
    }
    return res.send(responseConstants.created(data, "updated successfully"));
  } catch (error) {
    return res.send(
      responseConstants.hasError(
        error,
        "something went wrong while updating product"
      )
    );
  }
};
const deleteProductController = async (req, res) => {
  try {
    const data = await productService.deleteProduct(req.params.id);
    if (!data) {
      return res.send(responseConstants.notFound("Product not found"));
    }
    return res.send(responseConstants.created(data, "deleted successfully"));
  } catch (error) {
    return res.send(
      responseConstants.hasError(
        error,
        "something went wrong while deleting product"
      )
    );
  }
};
module.exports = {
  createProductController,
  getProductController,
  updateProductController,
  deleteProductController,
};
