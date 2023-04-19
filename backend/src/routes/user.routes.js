const router = require("express").Router();
const validations = require("../validations/user.validate");
const userController = require("../controller/user.controller");

router.post(
  "/",
  validations.createUserValidate,
  userController.createUserController
);
router.post(
  "/login",
  validations.loginValidation,
  userController.loginUserController
);


module.exports = router;
