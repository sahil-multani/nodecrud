const yup = require("yup");
const { sendResponse } = require("./validate");

const createProductValidation = async (req, res, next) => {
  const schema = yup.object({
    name: yup.string().required(),
    descrpition: yup.string().required(),
    image: yup.string().required(),
    createdBy: yup.string().required(),
    price: yup.number().positive().required(),
    quantity: yup.number().positive().required(),
  });

  sendResponse(req, res, next, schema);
};

const updateProductValidation = async (req, res, next) => {
  const schema = yup.object({
    id: yup.string().required().length(24),
    name: yup.string().optional(),
    descrpition: yup.string().optional(),
    image: yup.string().optional(),
    createdBy: yup.string().optional(),
    price: yup.number().positive().optional(),
    quantity: yup.number().positive().optional(),
  });

  sendResponse(req, res, next, schema);
};

const getProductListValidation = (req, res, next) => {
  const schema = yup.object({
    filter: yup.string().optional(),
    skip: yup.number().positive().optional().default(0),
    limit: yup.number().positive().optional().default(10),
    sort: yup.string().optional(),
  });
};

module.exports = {
  createProductValidation,
  updateProductValidation,
  getProductListValidation,
};
