const jwt = require("jsonwebtoken");
const { responseConstants } = require("../constants/responseConstants");
const TOKEN_SECRET = process.env.TOKEN_SECRET;

const verifyToken = async (req, res,next) => {
  try {
    const token = req.headers.token;
console.log({token})
    if (!token) {
      return res.status(401).send(responseConstants.notFound("Provide a token"));
    } else {
      jwt.verify(token, TOKEN_SECRET, (err, data) => {
        if (err) {
            console.log(err)
          return res.status(401).send(responseConstants.unauthorized());
        } else {
          next();
        }
      });
    }
  } catch (error) {
    console.log(error)
    return res.status(200).send(responseConstants.unauthorized());
  }
};

module.exports = {
  verifyToken,
};
