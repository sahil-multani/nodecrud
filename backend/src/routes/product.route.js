const router = require("express").Router();
const validate = require("../validations/product.validations");
const productController = require("../controller/product.controller");
const middleware = require("../middlewares/verifyToken");
router.post(
  "/",
  middleware.verifyToken,
  validate.createProductValidation,
  productController.createProductController
);
router.post(
  "/list",
  validate.getProductListValidation,
  middleware.verifyToken,
  productController.getProductController
);

router.put(
  "/",
  validate.updateProductValidation,
  middleware.verifyToken,
  productController.updateProductController
);
router.delete(
  "/:id",
  middleware.verifyToken,
  productController.deleteProductController
);
module.exports = router;
