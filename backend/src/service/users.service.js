const userModel = require("../models/users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const TOKEN_SECRET = process.env.TOKEN_SECRET;

const createUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const record = new userModel(data);
      const currentPwd = record.password;
      let encryptedPwd = bcrypt.hashSync(currentPwd, 10);
      record.password = encryptedPwd;
      let result = await record.save();
      // console.log({record,data,result})

      delete result._doc.password;
      return resolve(result);
    } catch (error) {
      //   console.log(error);
      if (error.code === 11000) {
        return reject("email alerdy exist");
      }
      return reject(error?.message || error);
    }
  });
};

const loginUser = (body) => {
  return new Promise(async (resolve, reject) => {
    let { email, password } = body;
    let record = await userModel.findOne({ email });
    if (!record) {
      return reject("invalid credentials"); //email does not exist
    }
    try {
      //   console.log({ id: record.id, record });
      let isValidPwd = bcrypt.compareSync(password, record.password);
      //   console.log(isValidPwd);
      if (isValidPwd) {
        const token = jwt.sign(
          { id: record.id, role: record.userType },
          TOKEN_SECRET,
          { expiresIn: "1h" }
        );
        const response = {
          token,
          ...record.toObject(),
        };
        return resolve(response);
      } else {
        reject("invalid credentials");
      }
    } catch (error) {
      //   console.log(error);
      return reject("invalid credentials");
    }
  });
};

module.exports = {
  createUser,
  loginUser,
};
