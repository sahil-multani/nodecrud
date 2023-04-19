const userServices = require("../service/users.service");
const { responseConstants } = require("../constants/responseConstants");

const createUserController = async (req, res) => {
  try {
    const body = req.body;
    let data = await userServices.createUser(body);
    return res.send(responseConstants.created(data));
  } catch (error) {
    return res.status(400).send(responseConstants.hasError(error));
  }
};


const loginUserController  = async (req, res) => {
    try {
      const body = req.body;
      let data = await userServices.loginUser(body);
      console.log({data})
      return res.send(responseConstants.created(data,"logged in successfully"));
    } catch (error) {
      return res.status(400).send(responseConstants.hasError(error));
    }
  };
module.exports = {
  createUserController,loginUserController
};
