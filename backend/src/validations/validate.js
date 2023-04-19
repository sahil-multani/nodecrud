const { responseConstants } = require("../constants/responseConstants");

const validate = async (Schema, data) => {
  const err = Schema.validate(data, { abortEarly: true });
  return err;
  //     return new Promise((resolve, reject) => {
  //     try {

  //     } catch (error) {

  //     }
  //   });
};
const sendResponse = async (req, res, next, schema) => {
  try {
    await validate(schema, req.body);
    // console.log(data.message);
    next();
  } catch (error) {
    return res.status(400).send(responseConstants.hasError(error.message));
  }
};
module.exports = { validate, sendResponse };
