const yup = require("yup");
const {validate,sendResponse} = require("./validate");

const createUserValidate = async (req, res, next) => {
  const Schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().min(8).required(),
      userType: yup.string().oneOf(["user", "admin"]).optional(),
    })
    .required();

  sendResponse(req, res, Schema);
};

const loginValidation = async (req, res,next) => {
  const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  sendResponse(req,res,next,schema)
};


module.exports = {
  createUserValidate,loginValidation
};
